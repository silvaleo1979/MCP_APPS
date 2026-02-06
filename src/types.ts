// Shared types for Calculadora de Propostas MCP App

export interface Project {
  name: string;
  costPerHour: number;
  tax: number;
  load: number;
  margin: number;
  commission: number;
  hours: number;
  totalCostPerHour: number;
  finalHourlyRate: number;
  projectTotal: number;
}

export interface Quotation {
  id: number;
  date: string;
  budgetName: string;
  observations: string;
  calculationType: "62.25" | "49.11";
  calculationTypeLabel: "Projetos" | "Sustentação";
  projects: Project[];
  totalHours: number;
  totalCost: number;
  totalClient: number;
}

export interface QuotationInput {
  budgetName: string;
  observations?: string;
  calculationType: "62.25" | "49.11";
  calculationTypeLabel: "Projetos" | "Sustentação";
  projects: Project[];
  totalHours: number;
  totalCost: number;
  totalClient: number;
}
