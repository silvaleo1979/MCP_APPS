# MCP Apps - Calculadora de Propostas T2C Group

![MCP](https://img.shields.io/badge/MCP-App-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-blue)
![Node.js](https://img.shields.io/badge/Node.js-18%2B-green)
![Chart.js](https://img.shields.io/badge/Chart.js-4.4-orange)
![License](https://img.shields.io/badge/license-MIT-green)

**MCP App completo** para cálculo de propostas comerciais por custo/hora com histórico persistente, estatísticas avançadas e gráficos interativos.

---

## 🚀 Características

- ✅ **Cálculo automático** de valores baseado em custo/hora, impostos, load, margem e comissão
- 💾 **Histórico persistente** em JSON de todas as cotações (CRUD completo)
- 📊 **Estatísticas avançadas** com 3 gráficos interativos (Chart.js)
- 🎨 **Interface moderna** com suporte a dark/light mode
- 🔧 **Dois tipos de cálculo**: Projetos (R$ 62,25/h) e Sustentação (R$ 49,11/h)
- 📱 **Responsivo** e mobile-friendly
- 🔨 **Integração Claude Desktop** via MCP Protocol

---

## 📊 Preview

### Interface Principal
![Calculadora](docs/images/screenshot-main.png)

### Estatísticas e Gráficos
![Estatísticas](docs/images/screenshot-stats.png)

---

## 🏗️ Arquitetura

```
┌─────────────────────────────────────────┐
│           CLAUDE DESKTOP                │
│  "Crie uma cotação para projeto X..."  │
└────────────────┬────────────────────────┘
                 │ MCP Protocol (stdio)
                 ▼
┌─────────────────────────────────────────┐
│        NODE.JS MCP SERVER               │
│  • 4 Tools (CRUD)                       │
│  • Validação Zod                        │
│  • Persistência JSON                    │
└────────────────┬────────────────────────┘
                 │
                 ├──► data/quotations.json
                 │
                 └──► UI Resource (HTML/JS/CSS)
                      └─► Chart.js Graphs
```

---

## 🔧 4 Tools MCP

| Tool | Descrição | Input | Output |
|------|-----------|-------|--------|
| `create_quotation` | Criar nova cotação | Dados completos | Cotação com ID |
| `list_quotations` | Listar cotações | limit (opt) | Array de cotações |
| `get_quotation` | Obter cotação específica | id | Cotação completa |
| `delete_quotation` | Remover cotação | id | Confirmação |

---

## 📦 Instalação

### Pré-requisitos

- Node.js 18+
- npm 9+
- Claude Desktop
- Git

### 1. Clone o repositório

```bash
git clone https://github.com/silvaleo1979/MCP_APPS.git
cd MCP_APPS/calculadora-proposta-mcp
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Build do projeto

```bash
npm run build
```

### 4. Configure no Claude Desktop

**Windows:**
```
%APPDATA%\Claude\claude_desktop_config.json
```

**macOS:**
```
~/Library/Application Support/Claude/claude_desktop_config.json
```

Adicione:

```json
{
  "mcpServers": {
    "calculadora-proposta": {
      "command": "node",
      "args": [
        "/caminho/completo/para/MCP_APPS/calculadora-proposta-mcp/dist/index.js",
        "--stdio"
      ]
    }
  }
}
```

### 5. Reinicie o Claude Desktop

1. Feche todas as janelas
2. Quit do system tray
3. Reabra o Claude Desktop
4. Verifique o ícone 🔨

---

## 💻 Desenvolvimento

### Scripts disponíveis

```bash
# Desenvolvimento com hot reload
npm run dev

# Build para produção
npm run build

# Testar com HTTP (navegador)
npm run start:http
# Acesse: http://localhost:3001/mcp

# Testar com stdio (Claude Desktop)
npm run start:stdio
```

---

## 📊 Estatísticas e Gráficos

O módulo de estatísticas oferece:

### 📈 Cards de Métricas
- Total de Cotações
- Valor Total Cotado
- Valor Médio
- Total de Horas

### 📊 Gráficos Interativos
1. **Distribuição por Tipo** (Donut) - Projetos vs Sustentação
2. **Top 5 Maiores Cotações** (Barras horizontais)
3. **Evolução Temporal** (Linha) - Últimas 10 cotações

---

## 💰 Fórmula de Cálculo

```
Custo Base (R$ 62,25 Projetos | R$ 49,11 Sustentação)
  ↓
+ Imposto 22%
  ↓
+ Load 35%
  ↓
= Custo/Hora Total Empresa
  ↓
+ Margem (configurável)
  ↓
+ Comissão (configurável)
  ↓
= Valor/Hora Final ao Cliente
  ↓
× Horas Previstas
  ↓
= VALOR TOTAL DO PROJETO
```

---

## 🎯 Exemplos de Uso

### Criar Cotação

```
Crie uma cotação para o cliente "Tech Solutions" tipo Projetos com:
- Backend API: 200 horas, margem 60%
- Frontend React: 150 horas, margem 55%
- Observação: "Projeto estratégico"
```

### Listar Histórico

```
Liste as últimas 10 cotações salvas
```

### Ver Detalhes

```
Mostre os detalhes da cotação #1738782123456
```

### Estatísticas

```
Mostre as estatísticas e gráficos das cotações
```

---

## 📁 Estrutura do Projeto

```
calculadora-proposta-mcp/
├── package.json              # Dependências e scripts
├── tsconfig.json             # Config TypeScript (UI)
├── tsconfig.server.json      # Config TypeScript (Server)
├── vite.config.ts            # Config Vite bundler
├── server.ts                 # 4 tools MCP
├── main.ts                   # Entry point
├── mcp-app.html             # Template HTML
├── src/
│   ├── mcp-app.ts           # UI Logic + MCP SDK + Charts
│   ├── mcp-app.css          # Estilos completos
│   └── types.ts             # Tipos TypeScript
├── data/
│   └── quotations.json      # Histórico persistente
├── dist/                    # Build output
│   ├── index.js             # Entry executável
│   ├── main.js              # Servidor compilado
│   ├── server.js            # Lógica compilada
│   └── mcp-app.html        # UI bundled (578 KB)
└── docs/
    ├── INDEX.md             # Índice de navegação
    ├── QUICK_START.md      # Início rápido
    ├── EXAMPLES.md         # Exemplos práticos
    ├── PROJECT_SUMMARY.md  # Arquitetura
    └── README.md           # Referência técnica
```

---

## 🛠️ Tecnologias

| Tecnologia | Versão | Uso |
|------------|--------|-----|
| TypeScript | 5.9.3 | Tipagem estática |
| Node.js | 18+ | Runtime servidor |
| MCP SDK | 1.24.0 | Protocol implementation |
| MCP Apps | 1.0.0 | UI framework |
| Chart.js | 4.4.0 | Gráficos interativos |
| Vite | 6.0.0 | Build & bundling |
| Zod | 4.1.13 | Schema validation |
| Express | 5.1.0 | HTTP server (dev) |

---

## 📚 Documentação

- **[INDEX.md](INDEX.md)** - Índice e navegação
- **[QUICK_START.md](QUICK_START.md)** - Configuração em 5 minutos
- **[EXAMPLES.md](EXAMPLES.md)** - Comandos práticos
- **[PROJECT_SUMMARY.md](PROJECT_SUMMARY.md)** - Arquitetura completa
- **[README.md](README.md)** - Referência técnica detalhada

---

## 🎨 Features da Interface

### Funcionalidades
- ✅ Seleção de tipo (Projetos/Sustentação)
- ✅ Múltiplos projetos por cotação
- ✅ Nomes de projetos editáveis
- ✅ Campos editáveis: margem, comissão, horas
- ✅ Cálculos automáticos em tempo real
- ✅ Resumo geral (horas, custos, valores)

### Ações
- 💾 **Salvar** - Persiste no histórico JSON
- 📜 **Histórico** - Listar/Carregar/Deletar cotações
- 📊 **Estatísticas** - Gráficos e análises
- 🗑️ **Limpar** - Reset completo do formulário

### Temas
- 🌞 Light mode (padrão)
- 🌙 Dark mode (automático via host)

---

## 🔐 Segurança

- ✅ Validação de schemas com Zod
- ✅ Sanitização de inputs
- ✅ Persistência local (JSON)
- ✅ Sem exposição de dados sensíveis

---

## 📈 Métricas

| Métrica | Valor |
|---------|-------|
| Linhas de Código | ~1.800 |
| Arquivos Criados | 20+ |
| Dependências | 163 packages |
| Tamanho UI Bundle | 578 KB (157 KB gzip) |
| Build Time | ~7 segundos |
| Tools MCP | 4 |
| Transports | stdio + HTTP |

---

## 🤝 Contribuindo

Contribuições são bem-vindas! Por favor:

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

---

## 📝 Changelog

### v1.0.0 (2026-02-05)

**✨ Features Iniciais**
- ✅ Calculadora de propostas com dois tipos (Projetos/Sustentação)
- ✅ CRUD completo de cotações
- ✅ Persistência em JSON
- ✅ 4 tools MCP implementados
- ✅ Interface completa e responsiva
- ✅ Integração com Claude Desktop

**📊 Estatísticas e Gráficos**
- ✅ Painel de estatísticas com 4 cards de métricas
- ✅ Gráfico de distribuição por tipo (Donut)
- ✅ Gráfico Top 5 maiores cotações (Barras)
- ✅ Gráfico de evolução temporal (Linha)
- ✅ Interatividade com Chart.js

**🎨 UI/UX**
- ✅ Nomes de projetos editáveis
- ✅ Botão "Limpar Tudo" funcionando corretamente
- ✅ Suporte a dark/light mode
- ✅ Responsivo (mobile-friendly)

---

## 🐛 Problemas Conhecidos

Nenhum no momento. Reporte issues em: [GitHub Issues](https://github.com/silvaleo1979/MCP_APPS/issues)

---

## 🗺️ Roadmap

### v1.1.0 (Futuro)
- [ ] Exportar cotações para PDF
- [ ] Importar/Exportar dados em Excel
- [ ] Templates de cotações
- [ ] Múltiplos usuários
- [ ] Backup automático

### v1.2.0 (Futuro)
- [ ] Dashboard gerencial
- [ ] Relatórios personalizados
- [ ] Integração com CRM
- [ ] API REST adicional

---

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

## 👤 Autor

**Leonardo Silva**
- GitHub: [@silvaleo1979](https://github.com/silvaleo1979)

---

## 🙏 Agradecimentos

- [Anthropic](https://www.anthropic.com/) - Claude Desktop e MCP Protocol
- [Chart.js](https://www.chartjs.org/) - Biblioteca de gráficos
- [Vite](https://vitejs.dev/) - Build tool
- [T2C Group](https://t2cgroup.com.br/) - Cliente e caso de uso

---

## 📞 Suporte

- 📧 Email: [seu-email@exemplo.com]
- 💬 Issues: [GitHub Issues](https://github.com/silvaleo1979/MCP_APPS/issues)
- 📚 Docs: [Documentação Completa](docs/)

---

**Desenvolvido com ❤️ para T2C Group**

*Calculadora de Propostas Comerciais por Custo/Hora*

---

## 🚀 Quick Start

```bash
# Clone
git clone https://github.com/silvaleo1979/MCP_APPS.git
cd MCP_APPS/calculadora-proposta-mcp

# Instale
npm install

# Build
npm run build

# Configure Claude Desktop (edite o caminho)
# Windows: %APPDATA%\Claude\claude_desktop_config.json
# macOS: ~/Library/Application Support/Claude/claude_desktop_config.json

# Reinicie Claude Desktop e comece a usar! 🎉
```

---

**⭐ Se este projeto foi útil, considere dar uma estrela no GitHub!**
