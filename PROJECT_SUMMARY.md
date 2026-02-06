# 📊 Calculadora de Propostas T2C - Resumo do Projeto

## 🎯 O Que Foi Criado

Um **MCP App completo** seguindo todas as boas práticas do guia oficial, transformando a calculadora HTML em uma aplicação MCP integrada ao Claude Desktop.

---

## 📐 Arquitetura

```
┌─────────────────────────────────────────────────────────┐
│                    CLAUDE DESKTOP                        │
│  "Crie uma cotação para projeto X com Y horas"          │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│                  MCP PROTOCOL (stdio)                    │
│  Tool: create_quotation, list_quotations, etc.          │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│              NODE.JS MCP SERVER (server.ts)              │
│  • Valida com Zod                                        │
│  • Processa cálculos                                     │
│  • Persiste em JSON                                      │
│  • Retorna UI Resource                                   │
└────────────────────┬────────────────────────────────────┘
                     │
                     ├──► data/quotations.json (persistência)
                     │
                     └──► UI Resource (mcp-app.html)
                          └─► Interface Interativa
                               • Adicionar projetos
                               • Calcular valores
                               • Ver histórico
                               • Copiar/Imprimir
```

---

## 🛠️ Tecnologias Utilizadas

| Tecnologia | Versão | Propósito |
|------------|--------|-----------|
| **TypeScript** | 5.9.3 | Tipagem estática |
| **Node.js** | 18+ | Runtime do servidor |
| **MCP SDK** | 1.24.0 | Protocol implementation |
| **MCP Apps** | 1.0.0 | UI framework |
| **Vite** | 6.0.0 | Build & bundling |
| **Zod** | 4.1.13 | Schema validation |
| **Express** | 5.1.0 | HTTP server (dev) |

---

## 📦 Estrutura de Arquivos

```
calculadora-proposta-mcp/
│
├── 📄 Configuração
│   ├── package.json                 # Deps + scripts
│   ├── tsconfig.json                # TS config (UI)
│   ├── tsconfig.server.json         # TS config (Server)
│   ├── vite.config.ts               # Vite bundler
│   └── .gitignore                   # Git ignore
│
├── 🔧 Servidor MCP
│   ├── server.ts                    # 4 tools MCP
│   ├── main.ts                      # Entry point
│   └── dist/
│       ├── index.js                 # Entry (executável)
│       ├── main.js                  # Compiled server
│       └── server.js                # Compiled logic
│
├── 🎨 Interface do Usuário
│   ├── mcp-app.html                 # Template HTML
│   ├── src/
│   │   ├── mcp-app.ts              # Lógica + MCP SDK
│   │   ├── mcp-app.css             # Estilos completos
│   │   └── types.ts                # TypeScript types
│   └── dist/
│       └── mcp-app.html            # UI bundled (411 KB)
│
├── 💾 Dados
│   └── data/
│       └── quotations.json          # Histórico (JSON)
│
└── 📚 Documentação
    ├── README.md                    # Doc completa
    ├── QUICK_START.md              # Início rápido
    ├── PROJECT_SUMMARY.md          # Este arquivo
    └── claude_desktop_config.example.json
```

---

## 🔨 4 Tools MCP Implementados

### 1. `create_quotation`
**Cria uma nova cotação**

```typescript
Input: {
  budgetName: string,
  observations?: string,
  calculationType: "62.25" | "49.11",
  calculationTypeLabel: "Projetos" | "Sustentação",
  projects: Project[],
  totalHours: number,
  totalCost: number,
  totalClient: number
}

Output: Quotation (com ID e timestamp)
```

### 2. `list_quotations`
**Lista cotações salvas**

```typescript
Input: {
  limit?: number  // padrão: 10
}

Output: {
  quotations: Quotation[],
  total: number
}
```

### 3. `get_quotation`
**Obtém cotação específica**

```typescript
Input: {
  id: number
}

Output: Quotation (completa)
```

### 4. `delete_quotation`
**Remove cotação**

```typescript
Input: {
  id: number
}

Output: {
  success: boolean,
  message: string
}
```

---

## 💰 Lógica de Cálculo

```
┌─────────────────────────────────────────┐
│  Custo/Hora Base                        │
│  • Projetos: R$ 62,25                   │
│  • Sustentação: R$ 49,11                │
└──────────────┬──────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────┐
│  + Imposto (22% fixo)                   │
│  = R$ 76,15 (Projetos)                  │
└──────────────┬──────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────┐
│  + Load (35% fixo)                      │
│  = R$ 102,80 (Custo/Hora Total)         │
└──────────────┬──────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────┐
│  + Margem (configurável, ex: 50%)       │
│  = R$ 154,20                            │
└──────────────┬──────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────┐
│  + Comissão (configurável, ex: 5%)      │
│  = R$ 161,91 (Valor/Hora Final)         │
└──────────────┬──────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────┐
│  × Horas Previstas (ex: 160h)           │
│  = R$ 25.905,60 (Valor Total Projeto)   │
└─────────────────────────────────────────┘
```

---

## 🎨 Recursos da Interface

### Funcionalidades Principais
- ✅ Seleção de tipo (Projetos/Sustentação)
- ✅ Múltiplos projetos por cotação
- ✅ Campos editáveis: margem, comissão, horas
- ✅ Cálculos automáticos em tempo real
- ✅ Resumo geral (horas, custos, valores)

### Ações Disponíveis
- 💾 **Salvar** → Persiste no histórico JSON
- 📜 **Histórico** → Listar/Carregar/Deletar cotações
- 📋 **Copiar** → Clipboard formatado
- 🖨️ **Imprimir** → PDF/Impressora
- 🗑️ **Limpar** → Reset completo

### Temas
- 🌞 Light mode (padrão)
- 🌙 Dark mode (automático via host)

---

## 📊 Exemplo de Dados Salvos

```json
{
  "id": 1738782123456,
  "date": "05/02/2026, 16:45",
  "budgetName": "Acme Corp - Portal E-commerce",
  "observations": "Projeto complexo, requer infraestrutura cloud",
  "calculationType": "62.25",
  "calculationTypeLabel": "Projetos",
  "projects": [
    {
      "name": "Backend API REST",
      "costPerHour": 62.25,
      "tax": 22,
      "load": 35,
      "margin": 60,
      "commission": 5,
      "hours": 240,
      "totalCostPerHour": 102.80,
      "finalHourlyRate": 172.69,
      "projectTotal": 41445.60
    },
    {
      "name": "Frontend React",
      "costPerHour": 62.25,
      "tax": 22,
      "load": 35,
      "margin": 55,
      "commission": 0,
      "hours": 180,
      "totalCostPerHour": 102.80,
      "finalHourlyRate": 159.34,
      "projectTotal": 28681.20
    }
  ],
  "totalHours": 420,
  "totalCost": 26145.00,
  "totalClient": 70126.80
}
```

---

## 🚀 Como Usar

### 1. No Desenvolvimento (HTTP)
```bash
cd "c:\Users\silva\OneDrive\Documentos\Python\MCP Apps\calculadora-proposta-mcp"
npm run dev
# Acesse: http://localhost:3001/mcp
```

### 2. No Claude Desktop (Produção)

**a) Configure o arquivo:**
```
C:\Users\silva\AppData\Roaming\Claude\claude_desktop_config.json
```

**b) Adicione:**
```json
{
  "mcpServers": {
    "calculadora-proposta": {
      "command": "node",
      "args": [
        "C:/Users/silva/OneDrive/Documentos/Python/MCP Apps/calculadora-proposta-mcp/dist/index.js",
        "--stdio"
      ]
    }
  }
}
```

**c) Reinicie Claude Desktop**

**d) Teste:**
```
Crie uma cotação para cliente "Tech Solutions" com:
- Desenvolvimento Backend: 200 horas
- Testes: 80 horas
- Tipo: Projetos
```

---

## ✅ Checklist de Qualidade

### Boas Práticas Implementadas
- [x] Estrutura modular (server/UI separados)
- [x] TypeScript com strict mode
- [x] Validação com Zod
- [x] Error handling robusto
- [x] Persistência em JSON
- [x] UI responsiva
- [x] Suporte a temas
- [x] Build otimizado (Vite)
- [x] Documentação completa
- [x] Exemplo de configuração

### Seguindo o Guia MCP
- [x] Tool registration correto
- [x] Resource registration
- [x] UI com MCP App SDK
- [x] structuredContent retornado
- [x] Schema validation (Zod)
- [x] HTTP e stdio support
- [x] Stateless server mode

---

## 📈 Métricas

| Métrica | Valor |
|---------|-------|
| **Linhas de Código** | ~1.500 |
| **Arquivos Criados** | 17 |
| **Dependências** | 160 packages |
| **Tamanho UI Bundle** | 411 KB (99 KB gzip) |
| **Build Time** | ~7 segundos |
| **Tools MCP** | 4 |
| **Tipo de Transport** | stdio + HTTP |

---

## 🔄 Fluxo de Trabalho

```
1. DESENVOLVIMENTO
   ├─ Editar código (server.ts, mcp-app.ts)
   ├─ npm run dev (watch mode)
   └─ Testar em http://localhost:3001/mcp

2. BUILD
   ├─ npm run build
   ├─ Valida TypeScript
   ├─ Bundle UI com Vite
   └─ Compila servidor

3. IMPLANTAÇÃO
   ├─ Configurar claude_desktop_config.json
   ├─ Reiniciar Claude Desktop
   └─ Testar tools no Claude

4. USO DIÁRIO
   ├─ "Crie uma cotação..."
   ├─ Claude chama create_quotation
   ├─ Servidor processa e salva
   ├─ UI renderiza resultado
   └─ Dados persistem em JSON
```

---

## 🎓 Aprendizados do Projeto

### O que foi implementado do Guia
1. ✅ Estrutura completa de projeto MCP
2. ✅ Configuração correta de TypeScript (2 configs)
3. ✅ Build com Vite (single file bundle)
4. ✅ Servidor com 4 tools
5. ✅ UI integrada com MCP SDK
6. ✅ Persistência em JSON
7. ✅ Validação Zod
8. ✅ Suporte HTTP e stdio
9. ✅ Documentação completa
10. ✅ Exemplo de configuração

### Diferenciais desta implementação
- 🎯 Adaptado do HTML original fornecido
- 💼 Caso de uso real (calculadora comercial)
- 📊 Múltiplos projetos por cotação
- 🔢 Cálculos complexos automatizados
- 🎨 Interface profissional T2C branded
- 💾 Histórico persistente (50 últimas)
- 📋 Exportação para clipboard
- 🖨️ Função de impressão
- 📱 Responsivo (mobile-ready)

---

## 🏆 Status Final

```
✅ PROJETO COMPLETO E FUNCIONAL

🎯 100% Seguindo boas práticas do guia
📦 Build sem erros
🧪 Testado com sucesso (HTTP)
📚 Documentação completa
🚀 Pronto para Claude Desktop
```

---

## 📞 Suporte

**Problemas?** Consulte:
1. `README.md` - Documentação detalhada
2. `QUICK_START.md` - Guia de início rápido
3. `MCP_APPS_DEVELOPMENT_GUIDE.md` - Guia oficial
4. Logs do Claude Desktop
5. Console do navegador (F12)

---

**Desenvolvido para T2C Group**  
*Calculadora de Propostas Comerciais por Custo/Hora*

**Data:** 05/02/2026  
**Versão:** 1.0.0
