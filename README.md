# Calculadora de Propostas T2C Group - MCP App

MCP App para cálculo de propostas comerciais por custo/hora para projetos e sustentação.

## Características

- ✅ **Cálculo automático** de valores baseado em custo/hora, impostos, load, margem e comissão
- 💾 **Histórico persistente** em JSON de todas as cotações
- 📊 **Interface interativa** com múltiplos projetos/serviços
- 🎨 **Suporte a temas** (light/dark mode)
- 📋 **Exportação** para clipboard e impressão
- 🔧 **Dois tipos de cálculo**: Projetos (R$ 62,25/h) e Sustentação (R$ 49,11/h)

## Instalação

```bash
# Instalar dependências
npm install

# Ou com bun (mais rápido)
bun install
```

## Desenvolvimento

```bash
# Modo desenvolvimento com hot reload
npm run dev

# Build para produção
npm run build

# Testar com HTTP (navegador)
npm run start:http
# Acesse: http://localhost:3001/mcp

# Rodar com stdio (Claude Desktop)
npm run start:stdio
```

## Estrutura do Projeto

```
calculadora-proposta-mcp/
├── package.json              # Dependências e scripts
├── tsconfig.json             # Config TypeScript (UI)
├── tsconfig.server.json      # Config TypeScript (Server)
├── vite.config.ts            # Config Vite bundler
├── server.ts                 # Lógica do servidor MCP
├── main.ts                   # Entry point
├── mcp-app.html             # Template HTML da UI
├── src/
│   ├── mcp-app.ts           # Lógica da UI + MCP SDK
│   ├── mcp-app.css          # Estilos
│   └── types.ts             # Tipos TypeScript
├── data/
│   └── quotations.json      # Histórico de cotações
└── dist/                    # Build output (gerado)
    ├── mcp-app.html         # UI bundled
    ├── index.js             # Server compiled
    └── server.js            # Server logic compiled
```

## Tools MCP Disponíveis

### 1. `create_quotation`
Cria uma nova cotação e salva no histórico.

**Input:**
- `budgetName`: Nome do orçamento/cliente
- `observations`: Observações (opcional)
- `calculationType`: "62.25" ou "49.11"
- `calculationTypeLabel`: "Projetos" ou "Sustentação"
- `projects`: Array de projetos
- `totalHours`: Total de horas
- `totalCost`: Custo total empresa
- `totalClient`: Valor total ao cliente

**Output:** Cotação criada com ID único

### 2. `list_quotations`
Lista todas as cotações salvas.

**Input:**
- `limit`: Número máximo de cotações (padrão: 10)

**Output:** Array de cotações com total

### 3. `get_quotation`
Obtém uma cotação específica pelo ID.

**Input:**
- `id`: ID da cotação

**Output:** Cotação completa

### 4. `delete_quotation`
Remove uma cotação do histórico.

**Input:**
- `id`: ID da cotação

**Output:** Confirmação de exclusão

## Configuração no Claude Desktop

### Windows

1. Localize o arquivo de configuração:
```
%APPDATA%\Claude\claude_desktop_config.json
```

2. Adicione a configuração:
```json
{
  "mcpServers": {
    "calculadora-proposta": {
      "command": "node",
      "args": [
        "C:/Users/SEU_USUARIO/OneDrive/Documentos/Python/MCP Apps/calculadora-proposta-mcp/dist/index.js",
        "--stdio"
      ]
    }
  }
}
```

3. **Reinicie o Claude Desktop completamente** (sair do system tray)

4. Verifique o ícone 🔨 no canto inferior direito

5. Teste com: "Use create_quotation para criar uma cotação de projeto X"

### macOS

1. Localize o arquivo de configuração:
```
~/Library/Application Support/Claude/claude_desktop_config.json
```

2. Siga os mesmos passos acima, ajustando o caminho para macOS

## Fórmulas de Cálculo

### Custo/Hora Total
```
Custo/Hora Total = Custo/Hora Puro × (1 + Imposto%) × (1 + Load%)
```

### Valor/Hora Final
```
Valor/Hora Final = Custo/Hora Total × (1 + Margem%) × (1 + Comissão%)
```

### Valor Total do Projeto
```
Valor Total = Valor/Hora Final × Horas Previstas
```

## Constantes Fixas

- **Imposto**: 22%
- **Load**: 35%
- **Margem padrão**: 50%
- **Custo/Hora Projetos**: R$ 62,25
- **Custo/Hora Sustentação**: R$ 49,11

## Persistência de Dados

Os dados são salvos em `data/quotations.json` no formato:

```json
[
  {
    "id": 1738782000000,
    "date": "05/02/2026, 16:40",
    "budgetName": "Cliente ABC",
    "observations": "Projeto piloto",
    "calculationType": "62.25",
    "calculationTypeLabel": "Projetos",
    "projects": [...],
    "totalHours": 320,
    "totalCost": 19920.00,
    "totalClient": 45000.00
  }
]
```

**Limite**: 50 cotações mais recentes

## Tecnologias Utilizadas

- **TypeScript** 5.9.3
- **Vite** 6.0.0 (bundler)
- **MCP SDK** 1.24.0
- **MCP Apps Extension** 1.0.0
- **Zod** 4.1.13 (validação)
- **Express** 5.1.0 (HTTP mode)

## Licença

MIT

---

**Desenvolvido para T2C Group**
