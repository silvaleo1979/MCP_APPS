# 📚 Índice de Documentação - Calculadora de Propostas T2C

## 🎯 Comece Aqui

### Para Usar Imediatamente
👉 **[QUICK_START.md](QUICK_START.md)** - Guia rápido de 5 minutos para configurar

### Para Entender o Projeto
👉 **[PROJECT_SUMMARY.md](PROJECT_SUMMARY.md)** - Visão geral completa da arquitetura

### Para Ver Exemplos Práticos
👉 **[EXAMPLES.md](EXAMPLES.md)** - Comandos e casos de uso reais

### Para Referência Técnica
👉 **[README.md](README.md)** - Documentação técnica completa

---

## 📖 Documentos Disponíveis

| Documento | Descrição | Quando Usar |
|-----------|-----------|-------------|
| **QUICK_START.md** | Início rápido e configuração | Primeira vez usando |
| **PROJECT_SUMMARY.md** | Arquitetura e visão geral | Entender estrutura |
| **EXAMPLES.md** | Exemplos de comandos | Usar no dia a dia |
| **README.md** | Referência técnica completa | Desenvolvimento |
| **INDEX.md** | Este arquivo (navegação) | Encontrar documentos |

---

## 🗂️ Estrutura de Arquivos

```
calculadora-proposta-mcp/
│
├── 📚 DOCUMENTAÇÃO
│   ├── INDEX.md                     ← Você está aqui
│   ├── QUICK_START.md              ← Comece por aqui!
│   ├── PROJECT_SUMMARY.md          ← Visão geral
│   ├── EXAMPLES.md                 ← Exemplos práticos
│   └── README.md                   ← Referência técnica
│
├── ⚙️ CONFIGURAÇÃO
│   ├── package.json                ← Dependências
│   ├── tsconfig.json               ← TypeScript UI
│   ├── tsconfig.server.json        ← TypeScript Server
│   ├── vite.config.ts              ← Vite bundler
│   ├── .gitignore                  ← Git ignore
│   └── claude_desktop_config.example.json ← Config Claude
│
├── 🔧 CÓDIGO FONTE
│   ├── server.ts                   ← MCP Server (4 tools)
│   ├── main.ts                     ← Entry point
│   ├── mcp-app.html               ← Template HTML
│   └── src/
│       ├── mcp-app.ts             ← UI Logic + MCP SDK
│       ├── mcp-app.css            ← Estilos
│       └── types.ts               ← Tipos TypeScript
│
├── 📦 BUILD OUTPUT
│   ├── dist/
│   │   ├── index.js               ← Entry executável
│   │   ├── main.js                ← Servidor compilado
│   │   ├── server.js              ← Lógica compilada
│   │   └── mcp-app.html          ← UI bundled (411 KB)
│   └── node_modules/              ← Dependências (160 packages)
│
└── 💾 DADOS
    └── data/
        └── quotations.json        ← Histórico de cotações
```

---

## 🚀 Fluxo de Leitura Recomendado

### Para Começar Rápido (10 minutos)
1. Leia **QUICK_START.md** seções 1 e 2
2. Configure no Claude Desktop
3. Teste com exemplos do **EXAMPLES.md**

### Para Entender Profundamente (30 minutos)
1. Leia **PROJECT_SUMMARY.md** completo
2. Veja **EXAMPLES.md** seção "Casos de Uso"
3. Consulte **README.md** seção "Tools MCP"

### Para Desenvolver/Modificar (1 hora)
1. Leia **README.md** completo
2. Estude **PROJECT_SUMMARY.md** seção "Arquitetura"
3. Veja código em `server.ts` e `src/mcp-app.ts`
4. Consulte `MCP_APPS_DEVELOPMENT_GUIDE.md` na pasta pai

---

## 📋 Referências Rápidas

### Comandos Essenciais

```bash
# Instalar dependências
npm install

# Desenvolvimento com hot reload
npm run dev

# Build para produção
npm run build

# Testar HTTP (porta 3001)
npm run start:http

# Testar stdio (Claude Desktop)
npm run start:stdio
```

### Arquivos de Configuração

| Arquivo | Localização | Propósito |
|---------|-------------|-----------|
| `package.json` | Raiz do projeto | Deps + scripts |
| `tsconfig.json` | Raiz do projeto | TS config UI |
| `tsconfig.server.json` | Raiz do projeto | TS config Server |
| `vite.config.ts` | Raiz do projeto | Vite bundler |
| `claude_desktop_config.json` | `%APPDATA%\Claude\` | Config Claude |

### Tools MCP

| Tool | Input | Output | Arquivo |
|------|-------|--------|---------|
| `create_quotation` | Dados cotação | Cotação com ID | server.ts:91 |
| `list_quotations` | limit (opt) | Array cotações | server.ts:140 |
| `get_quotation` | id | Cotação completa | server.ts:185 |
| `delete_quotation` | id | Success/Error | server.ts:234 |

---

## 🎓 Recursos Adicionais

### Dentro do Projeto
- `/src/types.ts` - Interfaces TypeScript
- `/src/mcp-app.css` - Estilos CSS customizáveis
- `/data/quotations.json` - Formato dos dados salvos

### Documentação Externa
- [MCP Protocol](https://modelcontextprotocol.io/)
- [MCP Apps Spec](https://modelcontextprotocol.github.io/ext-apps/)
- [Guia Oficial](../MCP_APPS_DEVELOPMENT_GUIDE.md)

---

## 🔍 Busca Rápida

### "Como faço para..."

| Pergunta | Documento | Seção |
|----------|-----------|-------|
| ...configurar no Claude? | QUICK_START.md | Passo 2️⃣ |
| ...criar uma cotação? | EXAMPLES.md | Criar Cotação Simples |
| ...ver o histórico? | EXAMPLES.md | Listar Histórico |
| ...modificar o código? | README.md | Build & Deployment |
| ...entender a arquitetura? | PROJECT_SUMMARY.md | Arquitetura |
| ...ver exemplos práticos? | EXAMPLES.md | Casos de Uso |
| ...instalar dependências? | QUICK_START.md | Instalação |
| ...fazer build? | README.md | Build Process |
| ...testar localmente? | QUICK_START.md | Passo 1️⃣ |
| ...usar os tools MCP? | README.md | Tools MCP Disponíveis |

---

## 📊 Status do Projeto

```
✅ Documentação: 5 arquivos completos
✅ Código Fonte: 7 arquivos TypeScript
✅ Build: Compilado sem erros
✅ Testes: Servidor HTTP funcionando
✅ Dependências: 160 packages instalados
✅ Bundle UI: 411 KB (99 KB gzip)
✅ Tools MCP: 4 implementados
✅ Pronto para: Claude Desktop
```

---

## 🆘 Precisa de Ajuda?

### Problemas Comuns
Consulte: **QUICK_START.md** → Seção "Troubleshooting"

### Dúvidas sobre Uso
Consulte: **EXAMPLES.md** → Exemplos práticos

### Questões Técnicas
Consulte: **README.md** → Documentação técnica

### Entendimento Geral
Consulte: **PROJECT_SUMMARY.md** → Arquitetura

---

## 🎯 Próximos Passos Sugeridos

1. ✅ Leia **QUICK_START.md**
2. ✅ Configure no Claude Desktop
3. ✅ Teste comandos do **EXAMPLES.md**
4. ✅ Explore a interface pelo navegador (HTTP mode)
5. ✅ Crie suas primeiras cotações
6. ✅ Analise o histórico gerado
7. ✅ Personalize para suas necessidades

---

## 📞 Informações do Projeto

**Nome:** Calculadora de Propostas T2C Group  
**Versão:** 1.0.0  
**Tipo:** MCP App (Model Context Protocol)  
**Linguagem:** TypeScript  
**Runtime:** Node.js 18+  
**License:** MIT  
**Desenvolvido para:** T2C Group  
**Data:** 05/02/2026

---

**🎉 Bem-vindo ao projeto!**

Comece pelo **[QUICK_START.md](QUICK_START.md)** e em 5 minutos você estará criando cotações!
