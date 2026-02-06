import {
  App,
  type McpUiHostContext,
} from "@modelcontextprotocol/ext-apps";
import {
  Chart,
  ArcElement,
  BarElement,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import "./mcp-app.css";
import type { Project, Quotation } from "./types.js";

// Register Chart.js components
Chart.register(
  ArcElement,
  BarElement,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
);

// Constants
const FIXED_TAX_RATE = 22;
const FIXED_LOAD = 35;
const DEFAULT_MARGIN = 50;

// State
let projectCount = 0;

// Get DOM elements
const budgetNameInput = document.getElementById("budgetName") as HTMLInputElement;
const calculationDateInput = document.getElementById("calculationDate") as HTMLInputElement;
const observationsTextarea = document.getElementById("observations") as HTMLTextAreaElement;
const projectsContainer = document.getElementById("projectsContainer") as HTMLDivElement;
const addProjectBtn = document.getElementById("addProjectBtn") as HTMLButtonElement;
const totalHoursElement = document.getElementById("totalHours") as HTMLDivElement;
const totalCostElement = document.getElementById("totalCost") as HTMLDivElement;
const totalClientElement = document.getElementById("totalClient") as HTMLDivElement;
const saveBtn = document.getElementById("saveBtn") as HTMLButtonElement;
const clearBtn = document.getElementById("clearBtn") as HTMLButtonElement;
const historyBtn = document.getElementById("historyBtn") as HTMLButtonElement;
const statsBtn = document.getElementById("statsBtn") as HTMLButtonElement;
const toast = document.getElementById("toast") as HTMLDivElement;
const historyModal = document.getElementById("historyModal") as HTMLDivElement;
const historyModalContent = document.getElementById("historyModalContent") as HTMLDivElement;
const closeModalBtn = document.getElementById("closeModalBtn") as HTMLButtonElement;
const statsModal = document.getElementById("statsModal") as HTMLDivElement;
const closeStatsBtn = document.getElementById("closeStatsBtn") as HTMLButtonElement;

// Create App instance
const app = new App({
  name: "Calculadora Proposta T2C",
  version: "1.0.0",
});

// Utility functions
function formatCurrency(value: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

function parseCurrency(value: string): number {
  return parseFloat(value.replace(/[^\d,-]/g, "").replace(",", ".")) || 0;
}

function updateCalculationDate(): void {
  const now = new Date();
  const formatted = now.toLocaleString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
  calculationDateInput.value = formatted;
}

function showToast(message: string, type: "success" | "warning" | "info" = "success"): void {
  toast.textContent = message;
  toast.style.display = "block";

  if (type === "warning") {
    toast.style.background = "#ffc107";
    toast.style.color = "#1A1A1A";
  } else if (type === "info") {
    toast.style.background = "#0085CD";
  } else {
    toast.style.background = "#28a745";
    toast.style.color = "white";
  }

  setTimeout(() => {
    toast.style.display = "none";
  }, 3000);
}

function calculateProject(id: number): void {
  const costPerHourInput = document.getElementById(`costPerHour-${id}`) as HTMLInputElement;
  const marginInput = document.getElementById(`margin-${id}`) as HTMLInputElement;
  const commissionInput = document.getElementById(`commission-${id}`) as HTMLInputElement;
  const hoursInput = document.getElementById(`hours-${id}`) as HTMLInputElement;
  const totalCostPerHourInput = document.getElementById(`totalCostPerHour-${id}`) as HTMLInputElement;
  const finalHourlyRateInput = document.getElementById(`finalHourlyRate-${id}`) as HTMLInputElement;
  const projectTotalInput = document.getElementById(`projectTotal-${id}`) as HTMLInputElement;

  const costPerHour = parseFloat(costPerHourInput.value) || 0;
  const taxRate = FIXED_TAX_RATE / 100;
  const load = FIXED_LOAD / 100;
  const margin = parseFloat(marginInput.value) || DEFAULT_MARGIN;
  const commission = parseFloat(commissionInput.value) || 0;
  const hours = parseFloat(hoursInput.value) || 0;

  const step1 = costPerHour * (1 + taxRate);
  const totalCostPerHour = step1 * (1 + load);

  const afterMargin = totalCostPerHour * (1 + margin / 100);
  const finalHourlyRate = afterMargin * (1 + commission / 100);

  const projectTotal = finalHourlyRate * hours;

  totalCostPerHourInput.value = formatCurrency(totalCostPerHour);
  finalHourlyRateInput.value = formatCurrency(finalHourlyRate);
  projectTotalInput.value = formatCurrency(projectTotal);

  calculateTotals();
}

function calculateTotals(): void {
  let totalHours = 0;
  let totalCostAmount = 0;
  let totalClientAmount = 0;

  document.querySelectorAll(".project-card").forEach((card) => {
    const id = parseInt(card.id.split("-")[1]);
    const hoursInput = document.getElementById(`hours-${id}`) as HTMLInputElement;
    const costPerHourInput = document.getElementById(`costPerHour-${id}`) as HTMLInputElement;
    const projectTotalInput = document.getElementById(`projectTotal-${id}`) as HTMLInputElement;

    const hours = parseFloat(hoursInput.value) || 0;
    const costPerHour = parseFloat(costPerHourInput.value) || 0;
    const projectTotal = parseCurrency(projectTotalInput.value);

    totalHours += hours;
    totalCostAmount += costPerHour * hours;
    totalClientAmount += projectTotal;
  });

  totalHoursElement.textContent = `${totalHours}h`;
  totalCostElement.textContent = formatCurrency(totalCostAmount);
  totalClientElement.textContent = formatCurrency(totalClientAmount);
}

function updateCalculationType(): void {
  const selectedType = (document.querySelector('input[name="calculationType"]:checked') as HTMLInputElement).value;

  document.querySelectorAll(".project-card").forEach((card) => {
    const id = card.id.split("-")[1];
    const costPerHourInput = document.getElementById(`costPerHour-${id}`) as HTMLInputElement;
    costPerHourInput.value = selectedType;
    calculateProject(parseInt(id));
  });

  showToast(`Tipo alterado! Custo/hora atualizado para R$ ${selectedType}`, "info");
}

function addProject(): void {
  projectCount++;
  const selectedType = (document.querySelector('input[name="calculationType"]:checked') as HTMLInputElement).value;

  const card = document.createElement("div");
  card.className = "project-card";
  card.id = `project-${projectCount}`;

  card.innerHTML = `
    <div class="project-header">
      <input type="text" class="project-name" placeholder="Nome do Projeto/Serviço" id="projectName-${projectCount}">
      <button class="remove-btn" data-id="${projectCount}">Remover</button>
    </div>
    <div class="project-grid">
      <div class="field cost-base">
        <label>Custo/Hora Puro (R$)</label>
        <input type="number" id="costPerHour-${projectCount}" value="${selectedType}" step="0.01" readonly>
      </div>
      <div class="field">
        <label>Imposto (%)</label>
        <input type="number" id="tax-${projectCount}" value="22" readonly>
      </div>
      <div class="field">
        <label>Load (%)</label>
        <input type="number" id="load-${projectCount}" value="35" readonly>
      </div>
      <div class="field">
        <label>Margem (%)</label>
        <input type="number" id="margin-${projectCount}" value="50" step="1" data-id="${projectCount}">
      </div>
      <div class="field">
        <label>Premiação/Comissão (%)</label>
        <input type="number" id="commission-${projectCount}" value="0" step="1" data-id="${projectCount}">
      </div>
      <div class="field">
        <label>Horas Previstas</label>
        <input type="number" id="hours-${projectCount}" value="160" step="1" data-id="${projectCount}">
      </div>
      <div class="field">
        <label>Custo/Hora Total (R$)</label>
        <input type="text" id="totalCostPerHour-${projectCount}" readonly value="R$ 0,00">
      </div>
      <div class="field highlight">
        <label>Valor/Hora Final (R$)</label>
        <input type="text" id="finalHourlyRate-${projectCount}" readonly value="R$ 0,00">
      </div>
      <div class="field highlight">
        <label>Valor Total Projeto (R$)</label>
        <input type="text" id="projectTotal-${projectCount}" readonly value="R$ 0,00">
      </div>
    </div>
  `;

  projectsContainer.appendChild(card);

  // Add event listeners
  const removeBtn = card.querySelector(".remove-btn") as HTMLButtonElement;
  removeBtn.addEventListener("click", () => removeProject(projectCount));

  const marginInput = card.querySelector(`#margin-${projectCount}`) as HTMLInputElement;
  const commissionInput = card.querySelector(`#commission-${projectCount}`) as HTMLInputElement;
  const hoursInput = card.querySelector(`#hours-${projectCount}`) as HTMLInputElement;

  marginInput.addEventListener("change", () => calculateProject(projectCount));
  commissionInput.addEventListener("change", () => calculateProject(projectCount));
  hoursInput.addEventListener("change", () => calculateProject(projectCount));

  calculateProject(projectCount);
}

function removeProject(id: number): void {
  if (document.querySelectorAll(".project-card").length <= 1) {
    showToast("Deve haver pelo menos um projeto!", "warning");
    return;
  }
  const card = document.getElementById(`project-${id}`);
  if (card) {
    card.remove();
    calculateTotals();
  }
}

function collectProjectsData(): Project[] {
  const projects: Project[] = [];

  document.querySelectorAll(".project-card").forEach((card) => {
    const id = parseInt(card.id.split("-")[1]);
    const projectNameInput = document.getElementById(`projectName-${id}`) as HTMLInputElement;
    const costPerHourInput = document.getElementById(`costPerHour-${id}`) as HTMLInputElement;
    const taxInput = document.getElementById(`tax-${id}`) as HTMLInputElement;
    const loadInput = document.getElementById(`load-${id}`) as HTMLInputElement;
    const marginInput = document.getElementById(`margin-${id}`) as HTMLInputElement;
    const commissionInput = document.getElementById(`commission-${id}`) as HTMLInputElement;
    const hoursInput = document.getElementById(`hours-${id}`) as HTMLInputElement;
    const totalCostPerHourInput = document.getElementById(`totalCostPerHour-${id}`) as HTMLInputElement;
    const finalHourlyRateInput = document.getElementById(`finalHourlyRate-${id}`) as HTMLInputElement;
    const projectTotalInput = document.getElementById(`projectTotal-${id}`) as HTMLInputElement;

    projects.push({
      name: projectNameInput.value || `Projeto ${id}`,
      costPerHour: parseFloat(costPerHourInput.value),
      tax: parseFloat(taxInput.value),
      load: parseFloat(loadInput.value),
      margin: parseFloat(marginInput.value),
      commission: parseFloat(commissionInput.value),
      hours: parseFloat(hoursInput.value),
      totalCostPerHour: parseCurrency(totalCostPerHourInput.value),
      finalHourlyRate: parseCurrency(finalHourlyRateInput.value),
      projectTotal: parseCurrency(projectTotalInput.value),
    });
  });

  return projects;
}

async function saveToHistory(): Promise<void> {
  const budgetName = budgetNameInput.value || "Sem nome";
  const observations = observationsTextarea.value;
  const selectedTypeInput = document.querySelector('input[name="calculationType"]:checked') as HTMLInputElement;
  const calculationType = selectedTypeInput.value as "62.25" | "49.11";
  const calculationTypeLabel = selectedTypeInput.id === "typeProjetos" ? "Projetos" : "Sustentação";
  const projects = collectProjectsData();
  const totalHours = parseFloat(totalHoursElement.textContent?.replace("h", "") || "0");
  const totalCost = parseCurrency(totalCostElement.textContent || "R$ 0,00");
  const totalClient = parseCurrency(totalClientElement.textContent || "R$ 0,00");

  try {
    const result = await app.callServerTool({
      name: "create_quotation",
      arguments: {
        budgetName,
        observations,
        calculationType,
        calculationTypeLabel,
        projects,
        totalHours,
        totalCost,
        totalClient,
      },
    });

    console.log("Quotation saved:", result);
    showToast("Orçamento salvo com sucesso!", "success");
  } catch (error) {
    console.error("Error saving quotation:", error);
    showToast(`Erro ao salvar: ${(error as Error).message}`, "warning");
  }
}

async function showHistory(): Promise<void> {
  try {
    const result = await app.callServerTool({
      name: "list_quotations",
      arguments: { limit: 50 },
    });

    const data = (result.structuredContent || {}) as { quotations: Quotation[]; total: number };

    if (data.quotations.length === 0) {
      historyModalContent.innerHTML = '<p style="text-align: center; color: #808080; padding: 20px;">Nenhum orçamento salvo ainda.</p>';
    } else {
      historyModalContent.innerHTML = data.quotations
        .map(
          (item) => `
          <div class="history-item">
            <div class="history-info">
              <div class="history-date">${item.date} - ${item.calculationTypeLabel || "N/A"}</div>
              <div class="history-name">${item.budgetName} - ${item.totalHours}h</div>
            </div>
            <div class="history-total">${formatCurrency(item.totalClient)}</div>
            <div class="history-actions">
              <button class="btn btn-primary btn-small" data-load-id="${item.id}">Carregar</button>
              <button class="btn btn-secondary btn-small" data-delete-id="${item.id}">Excluir</button>
            </div>
          </div>
        `
        )
        .join("");

      // Add event listeners for load and delete buttons
      historyModalContent.querySelectorAll("[data-load-id]").forEach((btn) => {
        btn.addEventListener("click", () => {
          const id = parseInt((btn as HTMLButtonElement).dataset.loadId!);
          loadCalculation(id);
        });
      });

      historyModalContent.querySelectorAll("[data-delete-id]").forEach((btn) => {
        btn.addEventListener("click", () => {
          const id = parseInt((btn as HTMLButtonElement).dataset.deleteId!);
          deleteCalculation(id);
        });
      });
    }

    historyModal.style.display = "flex";
  } catch (error) {
    console.error("Error loading history:", error);
    showToast(`Erro ao carregar histórico: ${(error as Error).message}`, "warning");
  }
}

async function loadCalculation(id: number): Promise<void> {
  try {
    const result = await app.callServerTool({
      name: "get_quotation",
      arguments: { id },
    });

    const quotation = result.structuredContent as unknown as Quotation;

    // Clear existing projects
    projectsContainer.innerHTML = "";
    projectCount = 0;

    // Set form data
    budgetNameInput.value = quotation.budgetName;
    observationsTextarea.value = quotation.observations || "";

    // Set calculation type
    const radioToCheck = quotation.calculationType === "62.25" ? "typeProjetos" : "typeSustentacao";
    (document.getElementById(radioToCheck) as HTMLInputElement).checked = true;

    // Add projects
    quotation.projects.forEach((proj) => {
      addProject();
      const currentId = projectCount;
      (document.getElementById(`projectName-${currentId}`) as HTMLInputElement).value = proj.name;
      (document.getElementById(`margin-${currentId}`) as HTMLInputElement).value = proj.margin.toString();
      (document.getElementById(`commission-${currentId}`) as HTMLInputElement).value = proj.commission.toString();
      (document.getElementById(`hours-${currentId}`) as HTMLInputElement).value = proj.hours.toString();
      calculateProject(currentId);
    });

    closeHistoryModal();
    showToast("Orçamento carregado com sucesso!", "success");
  } catch (error) {
    console.error("Error loading calculation:", error);
    showToast(`Erro ao carregar orçamento: ${(error as Error).message}`, "warning");
  }
}

async function deleteCalculation(id: number): Promise<void> {
  if (!confirm("Deseja realmente excluir este orçamento?")) return;

  try {
    await app.callServerTool({
      name: "delete_quotation",
      arguments: { id },
    });

    showToast("Orçamento excluído com sucesso!", "success");
    showHistory(); // Refresh history
  } catch (error) {
    console.error("Error deleting calculation:", error);
    showToast(`Erro ao excluir orçamento: ${(error as Error).message}`, "warning");
  }
}

function closeHistoryModal(): void {
  historyModal.style.display = "none";
}

function closeStatsModal(): void {
  statsModal.style.display = "none";
}

// Store chart instances to destroy them before recreating
let chartByType: Chart | null = null;
let chartTopQuotes: Chart | null = null;
let chartTimeline: Chart | null = null;

async function showStatistics(): Promise<void> {
  try {
    const result = await app.callServerTool({
      name: "list_quotations",
      arguments: { limit: 100 },
    });

    const data = (result.structuredContent || {}) as { quotations: Quotation[]; total: number };

    if (data.quotations.length === 0) {
      document.getElementById("statsModalContent")!.innerHTML = 
        '<div class="no-data-message">📊 Nenhum dado disponível ainda.<br>Crie algumas cotações para ver as estatísticas!</div>';
      statsModal.style.display = "flex";
      return;
    }

    // Calculate statistics
    const totalQuotes = data.quotations.length;
    const totalValue = data.quotations.reduce((sum, q) => sum + q.totalClient, 0);
    const avgValue = totalValue / totalQuotes;
    const totalHours = data.quotations.reduce((sum, q) => sum + q.totalHours, 0);

    // Count by type
    const projetosCount = data.quotations.filter(q => q.calculationTypeLabel === "Projetos").length;
    const sustentacaoCount = data.quotations.filter(q => q.calculationTypeLabel === "Sustentação").length;

    // Update stat cards
    document.getElementById("statTotalQuotes")!.textContent = totalQuotes.toString();
    document.getElementById("statTotalValue")!.textContent = formatCurrency(totalValue);
    document.getElementById("statAvgValue")!.textContent = formatCurrency(avgValue);
    document.getElementById("statTotalHours")!.textContent = `${totalHours}h`;

    // Show modal
    statsModal.style.display = "flex";

    // Wait for modal to be visible before creating charts
    setTimeout(() => {
      // Destroy existing charts
      if (chartByType) chartByType.destroy();
      if (chartTopQuotes) chartTopQuotes.destroy();
      if (chartTimeline) chartTimeline.destroy();

      // Chart 1: Distribution by Type (Pie)
      const ctxType = document.getElementById("chartByType") as HTMLCanvasElement;
      chartByType = new Chart(ctxType, {
        type: "doughnut",
        data: {
          labels: ["Projetos", "Sustentação"],
          datasets: [{
            data: [projetosCount, sustentacaoCount],
            backgroundColor: ["#0085CD", "#1C6A94"],
            borderWidth: 2,
            borderColor: "#fff",
          }],
        },
        options: {
          responsive: true,
          maintainAspectRatio: true,
          plugins: {
            legend: {
              position: "bottom",
            },
            tooltip: {
              callbacks: {
                label: function(context) {
                  const label = context.label || "";
                  const value = context.parsed || 0;
                  const total = projetosCount + sustentacaoCount;
                  const percentage = ((value / total) * 100).toFixed(1);
                  return `${label}: ${value} (${percentage}%)`;
                }
              }
            }
          },
        },
      });

      // Chart 2: Top 5 Quotes (Bar)
      const topQuotes = [...data.quotations]
        .sort((a, b) => b.totalClient - a.totalClient)
        .slice(0, 5);
      
      const ctxTop = document.getElementById("chartTopQuotes") as HTMLCanvasElement;
      chartTopQuotes = new Chart(ctxTop, {
        type: "bar",
        data: {
          labels: topQuotes.map(q => q.budgetName.substring(0, 20)),
          datasets: [{
            label: "Valor (R$)",
            data: topQuotes.map(q => q.totalClient),
            backgroundColor: "#4DB7F0",
            borderColor: "#0085CD",
            borderWidth: 1,
          }],
        },
        options: {
          responsive: true,
          maintainAspectRatio: true,
          plugins: {
            legend: {
              display: false,
            },
            tooltip: {
              callbacks: {
                label: function(context) {
                  const value = context.parsed.y ?? 0;
                  return `R$ ${value.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`;
                }
              }
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                callback: function(value) {
                  return `R$ ${(value as number).toLocaleString("pt-BR")}`;
                }
              }
            }
          },
        },
      });

      // Chart 3: Timeline (Line)
      const timelineData = data.quotations
        .map(q => ({
          date: new Date(q.date.split(",")[0].split("/").reverse().join("-")),
          value: q.totalClient,
          label: q.date.split(",")[0],
        }))
        .sort((a, b) => a.date.getTime() - b.date.getTime())
        .slice(-10); // Last 10

      const ctxTimeline = document.getElementById("chartTimeline") as HTMLCanvasElement;
      chartTimeline = new Chart(ctxTimeline, {
        type: "line",
        data: {
          labels: timelineData.map(d => d.label),
          datasets: [{
            label: "Valor Cotado",
            data: timelineData.map(d => d.value),
            borderColor: "#0085CD",
            backgroundColor: "rgba(0, 133, 205, 0.1)",
            tension: 0.4,
            fill: true,
            pointRadius: 5,
            pointHoverRadius: 7,
          }],
        },
        options: {
          responsive: true,
          maintainAspectRatio: true,
          plugins: {
            legend: {
              display: false,
            },
            tooltip: {
              callbacks: {
                label: function(context) {
                  const value = context.parsed.y ?? 0;
                  return `R$ ${value.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`;
                }
              }
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                callback: function(value) {
                  return `R$ ${(value as number).toLocaleString("pt-BR")}`;
                }
              }
            }
          },
        },
      });
    }, 100);

  } catch (error) {
    console.error("Error loading statistics:", error);
    showToast(`Erro ao carregar estatísticas: ${(error as Error).message}`, "warning");
  }
}

function clearAll(): void {
  if (!confirm("Deseja realmente limpar todos os dados?")) return;

  // Limpar campos de input
  budgetNameInput.value = "";
  observationsTextarea.value = "";
  
  // Limpar container de projetos
  projectsContainer.innerHTML = "";
  
  // Resetar tipo para Projetos
  (document.getElementById("typeProjetos") as HTMLInputElement).checked = true;
  
  // Resetar contador de projetos
  projectCount = 0;

  // Atualizar data para agora
  updateCalculationDate();

  // Adicionar um projeto vazio
  addProject();

  showToast("Todos os dados foram limpos!", "success");
}

// Event listeners
addProjectBtn.addEventListener("click", addProject);
saveBtn.addEventListener("click", saveToHistory);
clearBtn.addEventListener("click", clearAll);
historyBtn.addEventListener("click", showHistory);
statsBtn.addEventListener("click", showStatistics);
closeModalBtn.addEventListener("click", closeHistoryModal);
closeStatsBtn.addEventListener("click", closeStatsModal);

// Type selector change
document.querySelectorAll('input[name="calculationType"]').forEach((radio) => {
  radio.addEventListener("change", updateCalculationType);
});

// Modal close on outside click
window.addEventListener("click", (event) => {
  if (event.target === historyModal) {
    closeHistoryModal();
  }
  if (event.target === statsModal) {
    closeStatsModal();
  }
});

// Handle initial tool result from server
app.ontoolresult = (result) => {
  console.log("Received tool result:", result);
  // Tool results are handled in specific functions
};

// Handle host context changes (theme, safe area insets, etc.)
app.onhostcontextchanged = (context: McpUiHostContext) => {
  console.log("Host context changed:", context);

  // Apply theme to document
  if (context.theme === "dark") {
    document.documentElement.setAttribute("data-theme", "dark");
  } else {
    document.documentElement.setAttribute("data-theme", "light");
  }

  // Handle safe area insets (for mobile)
  if (context.safeAreaInsets) {
    document.body.style.paddingTop = `${context.safeAreaInsets.top}px`;
    document.body.style.paddingRight = `${context.safeAreaInsets.right}px`;
    document.body.style.paddingBottom = `${context.safeAreaInsets.bottom}px`;
    document.body.style.paddingLeft = `${context.safeAreaInsets.left}px`;
  }
};

// Initialize
(async () => {
  // Connect to host
  await app.connect();

  // Apply initial context
  const context = app.getHostContext();
  if (context) {
    if (context.theme === "dark") {
      document.documentElement.setAttribute("data-theme", "dark");
    } else {
      document.documentElement.setAttribute("data-theme", "light");
    }
  }

  // Initialize UI
  updateCalculationDate();
  addProject();

  console.log("Calculadora Proposta T2C initialized!");
})();
