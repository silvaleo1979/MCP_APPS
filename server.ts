import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type {
  CallToolResult,
  ReadResourceResult,
} from "@modelcontextprotocol/sdk/types.js";
import fs from "node:fs/promises";
import path from "node:path";
import { z } from "zod";
import {
  RESOURCE_MIME_TYPE,
  registerAppResource,
  registerAppTool,
} from "@modelcontextprotocol/ext-apps/server";
import type { Quotation } from "./src/types.js";

// Determine dist directory (works from source and compiled)
const DIST_DIR = import.meta.filename.endsWith(".ts")
  ? path.join(import.meta.dirname, "dist")
  : import.meta.dirname;

const DATA_DIR = import.meta.filename.endsWith(".ts")
  ? path.join(import.meta.dirname, "data")
  : path.join(import.meta.dirname, "..", "data");

const DATA_FILE = path.join(DATA_DIR, "quotations.json");

// Zod Schemas for validation
const ProjectSchema = z.object({
  name: z.string().describe("Nome do projeto/serviço"),
  costPerHour: z.number().describe("Custo por hora base"),
  tax: z.number().describe("Taxa de imposto (%)"),
  load: z.number().describe("Load/Encargos (%)"),
  margin: z.number().describe("Margem de lucro (%)"),
  commission: z.number().default(0).describe("Premiação/Comissão (%)"),
  hours: z.number().describe("Horas previstas"),
  totalCostPerHour: z.number().describe("Custo total por hora"),
  finalHourlyRate: z.number().describe("Valor final por hora"),
  projectTotal: z.number().describe("Valor total do projeto"),
});

const QuotationInputSchema = z.object({
  budgetName: z.string().describe("Nome do orçamento/cliente"),
  observations: z.string().optional().describe("Observações sobre o orçamento"),
  calculationType: z.enum(["62.25", "49.11"]).describe("Tipo de cálculo (62.25 = Projetos, 49.11 = Sustentação)"),
  calculationTypeLabel: z.enum(["Projetos", "Sustentação"]).describe("Label do tipo de cálculo"),
  projects: z.array(ProjectSchema).describe("Lista de projetos/serviços"),
  totalHours: z.number().describe("Total de horas"),
  totalCost: z.number().describe("Custo total empresa"),
  totalClient: z.number().describe("Valor total ao cliente"),
});

const QuotationSchema = QuotationInputSchema.extend({
  id: z.number().describe("ID único da cotação"),
  date: z.string().describe("Data e hora da criação"),
});

// Helper functions for JSON persistence
async function loadQuotations(): Promise<Quotation[]> {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    const data = await fs.readFile(DATA_FILE, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    // File doesn't exist yet, return empty array
    return [];
  }
}

async function saveQuotations(quotations: Quotation[]): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(DATA_FILE, JSON.stringify(quotations, null, 2), "utf-8");
}

/**
 * Creates a new MCP server instance.
 * IMPORTANT: Create a new instance per HTTP request (stateless mode).
 */
export function createServer(): McpServer {
  const server = new McpServer({
    name: "Calculadora Proposta T2C",
    version: "1.0.0",
  });

  const resourceUri = "ui://calculadora-proposta/app.html";

  // Tool 1: Create Quotation
  registerAppTool(
    server,
    "create_quotation",
    {
      title: "Criar Nova Cotação",
      description: "Cria uma nova cotação de projeto ou sustentação e salva no histórico",
      inputSchema: QuotationInputSchema.shape,
      outputSchema: QuotationSchema.shape,
      _meta: {
        ui: {
          resourceUri,
        },
      },
    },
    async (args): Promise<CallToolResult> => {
      const quotations = await loadQuotations();
      
      const newQuotation: Quotation = {
        ...args,
        observations: args.observations || "",
        id: Date.now(),
        date: new Date().toLocaleString("pt-BR"),
      };

      quotations.unshift(newQuotation);
      
      // Keep only last 50 quotations
      if (quotations.length > 50) {
        quotations.splice(50);
      }

      await saveQuotations(quotations);

      return {
        content: [
          {
            type: "text",
            text: `Cotação criada com sucesso!\n\nCliente: ${newQuotation.budgetName}\nTipo: ${newQuotation.calculationTypeLabel}\nValor Total: R$ ${newQuotation.totalClient.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}\nTotal de Horas: ${newQuotation.totalHours}h\nProjetos: ${newQuotation.projects.length}`,
          },
        ],
        structuredContent: newQuotation as unknown as Record<string, unknown>,
      };
    }
  );

  // Tool 2: List Quotations
  registerAppTool(
    server,
    "list_quotations",
    {
      title: "Listar Cotações",
      description: "Lista todas as cotações salvas no histórico",
      inputSchema: z.object({
        limit: z.number().optional().default(10).describe("Número máximo de cotações a retornar"),
      }).shape,
      outputSchema: z.object({
        quotations: z.array(QuotationSchema),
        total: z.number(),
      }).shape,
      _meta: {
        ui: {
          resourceUri,
        },
      },
    },
    async (args): Promise<CallToolResult> => {
      const quotations = await loadQuotations();
      const limit = args.limit || 10;
      const limitedQuotations = quotations.slice(0, limit);

      const summary = limitedQuotations
        .map(
          (q, idx) =>
            `${idx + 1}. ${q.budgetName} - ${q.calculationTypeLabel} - R$ ${q.totalClient.toLocaleString("pt-BR", { minimumFractionDigits: 2 })} (${q.date})`
        )
        .join("\n");

      return {
        content: [
          {
            type: "text",
            text: `Total de cotações: ${quotations.length}\nMostrando ${limitedQuotations.length} cotações:\n\n${summary || "Nenhuma cotação encontrada."}`,
          },
        ],
        structuredContent: {
          quotations: limitedQuotations as unknown as Record<string, unknown>[],
          total: quotations.length,
        } as Record<string, unknown>,
      };
    }
  );

  // Tool 3: Get Quotation by ID
  registerAppTool(
    server,
    "get_quotation",
    {
      title: "Obter Cotação",
      description: "Obtém uma cotação específica pelo ID",
      inputSchema: z.object({
        id: z.number().describe("ID da cotação"),
      }).shape,
      outputSchema: QuotationSchema.shape,
      _meta: {
        ui: {
          resourceUri,
        },
      },
    },
    async (args): Promise<CallToolResult> => {
      const quotations = await loadQuotations();
      const quotation = quotations.find((q) => q.id === args.id);

      if (!quotation) {
        return {
          content: [
            {
              type: "text",
              text: `Cotação com ID ${args.id} não encontrada.`,
            },
          ],
          isError: true,
        };
      }

      const projectsDetails = quotation.projects
        .map(
          (p, idx) =>
            `\n${idx + 1}. ${p.name}\n   - Horas: ${p.hours}h\n   - Valor/Hora: R$ ${p.finalHourlyRate.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}\n   - Total: R$ ${p.projectTotal.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`
        )
        .join("");

      return {
        content: [
          {
            type: "text",
            text: `Cotação #${quotation.id}\n\nCliente: ${quotation.budgetName}\nData: ${quotation.date}\nTipo: ${quotation.calculationTypeLabel}\nObservações: ${quotation.observations || "N/A"}\n\nProjetos/Serviços:${projectsDetails}\n\nRESUMO:\nTotal de Horas: ${quotation.totalHours}h\nCusto Total Empresa: R$ ${quotation.totalCost.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}\nValor Total ao Cliente: R$ ${quotation.totalClient.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`,
          },
        ],
        structuredContent: quotation as unknown as Record<string, unknown>,
      };
    }
  );

  // Tool 4: Delete Quotation
  registerAppTool(
    server,
    "delete_quotation",
    {
      title: "Deletar Cotação",
      description: "Remove uma cotação do histórico pelo ID",
      inputSchema: z.object({
        id: z.number().describe("ID da cotação a ser deletada"),
      }).shape,
      outputSchema: z.object({
        success: z.boolean(),
        message: z.string(),
      }).shape,
      _meta: {
        ui: {
          resourceUri,
        },
      },
    },
    async (args): Promise<CallToolResult> => {
      const quotations = await loadQuotations();
      const initialLength = quotations.length;
      const filtered = quotations.filter((q) => q.id !== args.id);

      if (filtered.length === initialLength) {
        return {
          content: [
            {
              type: "text",
              text: `Cotação com ID ${args.id} não encontrada.`,
            },
          ],
          structuredContent: {
            success: false,
            message: `Cotação com ID ${args.id} não encontrada.`,
          },
          isError: true,
        };
      }

      await saveQuotations(filtered);

      return {
        content: [
          {
            type: "text",
            text: `Cotação #${args.id} deletada com sucesso!`,
          },
        ],
        structuredContent: {
          success: true,
          message: `Cotação #${args.id} deletada com sucesso!`,
        },
      };
    }
  );

  // Register the UI resource
  registerAppResource(
    server,
    resourceUri,
    resourceUri,
    {
      mimeType: RESOURCE_MIME_TYPE,
      description: "Interface da Calculadora de Propostas T2C Group",
    },
    async (): Promise<ReadResourceResult> => {
      const html = await fs.readFile(
        path.join(DIST_DIR, "mcp-app.html"),
        "utf-8"
      );

      return {
        contents: [
          {
            uri: resourceUri,
            mimeType: RESOURCE_MIME_TYPE,
            text: html,
          },
        ],
      };
    }
  );

  return server;
}
