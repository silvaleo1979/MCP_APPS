# 🚀 Quick Start - Calculadora de Propostas T2C

## ✅ O que foi criado

Um **MCP App completo** para cálculo de propostas comerciais com:

- ✨ Interface interativa completa
- 💾 Persistência de dados em JSON
- 🔧 4 tools MCP (criar, listar, obter, deletar cotações)
- 🎨 Suporte a dark/light mode
- 📊 Cálculos automáticos de margem, comissão e valores finais

## 📁 Arquivos Criados

```
calculadora-proposta-mcp/
├── package.json                      ✅ Dependências instaladas
├── tsconfig.json                     ✅ Config TypeScript UI
├── tsconfig.server.json              ✅ Config TypeScript Server
├── vite.config.ts                    ✅ Config Vite
├── server.ts                         ✅ 4 tools MCP
├── main.ts                           ✅ Entry point
├── mcp-app.html                      ✅ Template UI
├── src/
│   ├── mcp-app.ts                   ✅ Lógica UI + MCP SDK
│   ├── mcp-app.css                  ✅ Estilos completos
│   └── types.ts                     ✅ Tipos TypeScript
├── data/
│   └── quotations.json              ✅ Armazenamento (vazio)
├── dist/                            ✅ Build completo
│   ├── index.js                     ✅ Entry point
│   ├── main.js                      ✅ Servidor
│   ├── server.js                    ✅ Lógica MCP
│   └── mcp-app.html                 ✅ UI bundled (411 KB)
├── README.md                         ✅ Documentação completa
├── .gitignore                        ✅ Ignorar arquivos
└── claude_desktop_config.example.json ✅ Config exemplo
```

## 🎯 Próximos Passos

### 1️⃣ Testar Localmente (Opcional)

```bash
# Em um terminal, inicie o servidor HTTP
cd "c:\Users\silva\OneDrive\Documentos\Python\MCP Apps\calculadora-proposta-mcp"
$env:PORT=3002
node dist/index.js

# Acesse no navegador:
# http://localhost:3002/mcp
```

### 2️⃣ Configurar no Claude Desktop (Principal)

1. **Localize o arquivo de configuração:**
   ```
   %APPDATA%\Claude\claude_desktop_config.json
   ```
   
   Caminho completo no seu PC:
   ```
   C:\Users\silva\AppData\Roaming\Claude\claude_desktop_config.json
   ```

2. **Abra o arquivo e adicione (ou crie se não existir):**

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

3. **Reinicie o Claude Desktop COMPLETAMENTE**
   - Feche todas as janelas
   - Saia pelo system tray (ícone na bandeja)
   - Abra novamente

4. **Verifique a instalação:**
   - Procure o ícone 🔨 no canto inferior direito
   - Clique nele
   - Deve aparecer "calculadora-proposta" na lista

### 3️⃣ Testar no Claude

Experimente estes comandos:

```
Crie uma cotação de projeto para o cliente "Acme Corp" com:
- Projeto de desenvolvimento: 200 horas, margem 60%
- Projeto de testes: 80 horas, margem 50%
- Tipo: Projetos
```

```
Liste as últimas 5 cotações salvas
```

```
Mostre os detalhes da cotação #1738782000000
```

```
Delete a cotação #1738782000000
```

## 🔧 Tools MCP Disponíveis

| Tool | Descrição |
|------|-----------|
| `create_quotation` | Cria nova cotação com projetos e valores |
| `list_quotations` | Lista cotações salvas (limite configurável) |
| `get_quotation` | Obtém detalhes de uma cotação específica |
| `delete_quotation` | Remove cotação do histórico |

## 📊 Como Funciona

### Fluxo no Claude Desktop

```
Claude → MCP Tool → Servidor Node.js → JSON → Retorno
                                       ↓
                                   UI HTML
```

1. **Você pede** ao Claude para criar/consultar cotações
2. **Claude chama** o tool MCP apropriado
3. **Servidor processa** e salva em `data/quotations.json`
4. **UI renderiza** a interface interativa (opcional)
5. **Dados persistem** entre sessões

### Cálculos Automáticos

```
Custo/Hora Base (R$ 62,25 ou R$ 49,11)
    ↓
+ Imposto 22%
    ↓
+ Load 35%
    ↓
= Custo/Hora Total Empresa
    ↓
+ Margem (configurável)
    ↓
+ Comissão/Premiação (configurável)
    ↓
= Valor/Hora Final ao Cliente
    ↓
× Horas Previstas
    ↓
= Valor Total do Projeto
```

## 🎨 Recursos da Interface

- ✅ Múltiplos projetos/serviços em uma cotação
- ✅ Cálculo automático de valores
- ✅ Histórico completo com busca
- ✅ Copiar para clipboard
- ✅ Imprimir cotação
- ✅ Dark mode automático
- ✅ Responsivo (mobile-friendly)

## 📝 Exemplo de Cotação Salva

```json
{
  "id": 1738782000000,
  "date": "05/02/2026, 16:40",
  "budgetName": "Cliente ABC - Portal Web",
  "observations": "Projeto com urgência, prazo 3 meses",
  "calculationType": "62.25",
  "calculationTypeLabel": "Projetos",
  "projects": [
    {
      "name": "Desenvolvimento Backend",
      "costPerHour": 62.25,
      "tax": 22,
      "load": 35,
      "margin": 60,
      "commission": 5,
      "hours": 200,
      "totalCostPerHour": 102.34,
      "finalHourlyRate": 171.96,
      "projectTotal": 34392.00
    },
    {
      "name": "Desenvolvimento Frontend",
      "costPerHour": 62.25,
      "tax": 22,
      "load": 35,
      "margin": 55,
      "commission": 0,
      "hours": 160,
      "totalCostPerHour": 102.34,
      "finalHourlyRate": 158.63,
      "projectTotal": 25380.80
    }
  ],
  "totalHours": 360,
  "totalCost": 22410.00,
  "totalClient": 59772.80
}
```

## 🆘 Troubleshooting

### Problema: Claude não reconhece o servidor

**Solução:**
1. Verifique o caminho no `claude_desktop_config.json`
2. Certifique-se que o Node.js está instalado (`node --version`)
3. Reinicie o Claude Desktop completamente
4. Verifique os logs do Claude Desktop

### Problema: Erro ao salvar cotação

**Solução:**
1. Verifique se a pasta `data/` existe
2. Verifique permissões de escrita
3. Veja os logs no terminal

### Problema: UI não carrega

**Solução:**
1. Verifique se o arquivo `dist/mcp-app.html` existe
2. Rode `npm run build` novamente
3. Verifique o console do navegador (F12)

## 🔄 Atualizações Futuras

Para atualizar o código:

```bash
# 1. Edite os arquivos fonte (server.ts, src/mcp-app.ts, etc)
cd "c:\Users\silva\OneDrive\Documentos\Python\MCP Apps\calculadora-proposta-mcp"

# 2. Rebuild
npm run build

# 3. Reinicie Claude Desktop
```

## 📚 Documentação Adicional

- Ver `README.md` para documentação completa
- Ver `MCP_APPS_DEVELOPMENT_GUIDE.md` para guia de desenvolvimento
- Exemplos de uso dos tools no README

## ✅ Status Final

- [x] Projeto criado
- [x] Dependências instaladas (160 packages)
- [x] Build completo (sem erros)
- [x] Servidor testado (porta 3002)
- [x] 4 tools MCP implementados
- [x] UI completa e responsiva
- [x] Persistência em JSON funcionando
- [x] Pronto para uso no Claude Desktop

---

**🎉 Projeto concluído com sucesso!**

Para começar a usar, siga o passo 2️⃣ acima e configure no Claude Desktop.
