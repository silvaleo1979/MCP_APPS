# 💡 Exemplos de Uso - Calculadora de Propostas T2C

## 📝 Comandos para o Claude Desktop

### 1️⃣ Criar Cotação Simples

**Você:**
```
Crie uma cotação para o cliente "Banco XYZ" do tipo Projetos com:
- Desenvolvimento de API: 160 horas, margem 55%
- Observação: "Projeto com início em março/2026"
```

**Claude vai:**
1. Chamar `create_quotation`
2. Calcular valores automaticamente
3. Salvar em `data/quotations.json`
4. Retornar resumo com valor total

**Resultado esperado:**
```
Cotação criada com sucesso!

Cliente: Banco XYZ
Tipo: Projetos
Valor Total: R$ 26.214,40
Total de Horas: 160h
Projetos: 1
```

---

### 2️⃣ Criar Cotação Múltiplos Projetos

**Você:**
```
Crie uma proposta completa para "E-commerce Solutions":
- Backend API REST: 240 horas, margem 60%, comissão 5%
- Frontend React: 180 horas, margem 55%
- Testes Automatizados: 80 horas, margem 50%
- DevOps e Deploy: 40 horas, margem 45%
Tipo: Projetos
Observação: "Cliente premium, prazo 4 meses"
```

**Resultado esperado:**
```
Cotação criada com sucesso!

Cliente: E-commerce Solutions
Tipo: Projetos
Valor Total: R$ 91.768,80
Total de Horas: 540h
Projetos: 4
```

---

### 3️⃣ Listar Histórico

**Você:**
```
Liste as últimas 10 cotações salvas
```

**Resultado esperado:**
```
Total de cotações: 15
Mostrando 10 cotações:

1. E-commerce Solutions - Projetos - R$ 91.768,80 (05/02/2026, 16:50)
2. Banco XYZ - Projetos - R$ 26.214,40 (05/02/2026, 16:45)
3. Tech Corp - Sustentação - R$ 18.945,60 (04/02/2026, 14:30)
4. StartupABC - Projetos - R$ 45.321,00 (04/02/2026, 10:15)
5. Varejo Digital - Projetos - R$ 67.890,50 (03/02/2026, 16:20)
...
```

---

### 4️⃣ Ver Detalhes de Cotação

**Você:**
```
Mostre os detalhes completos da cotação #1738782123456
```

**Resultado esperado:**
```
Cotação #1738782123456

Cliente: E-commerce Solutions
Data: 05/02/2026, 16:50
Tipo: Projetos
Observações: Cliente premium, prazo 4 meses

Projetos/Serviços:

1. Backend API REST
   - Horas: 240h
   - Valor/Hora: R$ 172,69
   - Total: R$ 41.445,60

2. Frontend React
   - Horas: 180h
   - Valor/Hora: R$ 159,34
   - Total: R$ 28.681,20

3. Testes Automatizados
   - Horas: 80h
   - Valor/Hora: R$ 154,20
   - Total: R$ 12.336,00

4. DevOps e Deploy
   - Horas: 40h
   - Valor/Hora: R$ 148,29
   - Total: R$ 5.931,60

RESUMO:
Total de Horas: 540h
Custo Total Empresa: R$ 33.615,00
Valor Total ao Cliente: R$ 88.394,40
```

---

### 5️⃣ Deletar Cotação

**Você:**
```
Delete a cotação #1738782123456
```

**Resultado esperado:**
```
Cotação #1738782123456 deletada com sucesso!
```

---

## 🎯 Casos de Uso Reais

### Cenário 1: Proposta para Sustentação Mensal

**Situação:** Cliente precisa de suporte contínuo

**Comando:**
```
Crie uma cotação de sustentação para "Acme Corp" com:
- Suporte L1: 80 horas/mês, margem 40%
- Suporte L2: 40 horas/mês, margem 45%
- Plantão 24/7: 20 horas/mês, margem 50%, comissão 10%
Observação: "Contrato anual, revisão trimestral"
```

**Uso:** Cotação mensal recorrente com diferentes níveis de serviço

---

### Cenário 2: Projeto Complexo Multi-fase

**Situação:** Projeto grande dividido em fases

**Comando:**
```
Crie proposta para "MegaCorp - Portal Corporativo":
- Fase 1 - Análise e Design: 120h, margem 65%
- Fase 2 - Desenvolvimento Backend: 280h, margem 60%
- Fase 3 - Desenvolvimento Frontend: 240h, margem 60%
- Fase 4 - Integração e Testes: 160h, margem 55%
- Fase 5 - Implantação e Treinamento: 80h, margem 50%
Tipo: Projetos
Observação: "Projeto estratégico, 6 meses, pagamento por fase"
```

**Uso:** Proposta detalhada com milestones definidos

---

### Cenário 3: Comparação de Tipos

**Situação:** Cliente quer ver diferença entre Projetos vs Sustentação

**Comandos:**
```
1) Crie cotação "Cliente ABC - Opção Projetos" tipo Projetos com:
   - Desenvolvimento: 200h, margem 55%

2) Crie cotação "Cliente ABC - Opção Sustentação" tipo Sustentação com:
   - Desenvolvimento: 200h, margem 55%

3) Liste as 2 últimas cotações para comparar
```

**Uso:** Comparar custos entre tipos de contrato

---

### Cenário 4: Proposta com Premiação

**Situação:** Comissão por entrega antecipada

**Comando:**
```
Crie cotação "StartupXYZ - MVP Rápido":
- Desenvolvimento Core: 160h, margem 60%, comissão 15%
- Design UI/UX: 80h, margem 55%, comissão 10%
Tipo: Projetos
Observação: "Comissão por entrega 30 dias antes do prazo"
```

**Uso:** Incentivo para entregas rápidas

---

### Cenário 5: Auditoria de Histórico

**Situação:** Revisar cotações do último mês

**Comandos:**
```
1) Liste as últimas 20 cotações

2) Mostre detalhes da cotação #[ID com maior valor]

3) Mostre detalhes da cotação #[ID com menor valor]
```

**Uso:** Análise de precificação e padrões

---

## 🔧 Comandos Avançados

### Criar Cotação com Dados Calculados

**Você:**
```
Preciso cotar um projeto de 500 horas dividido em:
- 40% para Backend (margem 60%)
- 35% para Frontend (margem 55%)
- 15% para Testes (margem 50%)
- 10% para DevOps (margem 45%)
Cliente: "Tech Innovators"
Tipo: Projetos
```

**Claude vai:**
1. Calcular as horas: 200h, 175h, 75h, 50h
2. Criar cotação com 4 projetos
3. Aplicar margens diferentes
4. Retornar valor total

---

### Buscar e Atualizar (via delete + create)

**Você:**
```
1) Liste cotações do cliente "Acme Corp"
2) Mostre detalhes da cotação #[ID encontrado]
3) Delete a cotação #[ID]
4) Crie nova cotação "Acme Corp - Revisão v2" com valores atualizados...
```

**Uso:** Atualizar cotação existente (não há update direto)

---

## 📊 Exemplos de Análise

### Análise de Rentabilidade

**Você:**
```
Liste as últimas 5 cotações e para cada uma me diga:
1. A margem média aplicada
2. O custo vs valor ao cliente
3. A rentabilidade percentual
```

**Claude vai:**
- Buscar cotações com `list_quotations`
- Analisar dados estruturados
- Calcular métricas
- Retornar análise comparativa

---

### Relatório Mensal

**Você:**
```
Das últimas 30 cotações:
1. Quantas são tipo Projetos vs Sustentação?
2. Qual o valor total cotado?
3. Qual a média de horas por cotação?
4. Qual a margem média aplicada?
```

**Uso:** Relatório gerencial de vendas

---

## 🎨 Personalizações

### Margem Personalizada por Complexidade

**Baixa Complexidade (margem 45-50%):**
```
Crie cotação para "Manutenção Simples":
- Ajustes CSS: 20h, margem 45%
- Correção de Bugs: 30h, margem 45%
```

**Média Complexidade (margem 55-60%):**
```
Crie cotação para "Nova Funcionalidade":
- Backend: 80h, margem 60%
- Frontend: 60h, margem 55%
```

**Alta Complexidade (margem 65-70%):**
```
Crie cotação para "Arquitetura Complexa":
- Design de Sistema: 40h, margem 70%
- Implementação: 120h, margem 65%
```

---

### Comissão por Performance

**Sem Comissão (entrega padrão):**
```
- Desenvolvimento: 160h, margem 55%, comissão 0%
```

**Com Comissão 5% (entrega qualidade):**
```
- Desenvolvimento: 160h, margem 55%, comissão 5%
```

**Com Comissão 10% (entrega antecipada):**
```
- Desenvolvimento: 160h, margem 55%, comissão 10%
```

**Com Comissão 15% (entrega crítica):**
```
- Desenvolvimento: 160h, margem 55%, comissão 15%
```

---

## 🚀 Fluxo de Trabalho Completo

### Passo a Passo: Do Cliente à Cotação Final

**1. Cliente solicita orçamento:**
```
Cliente: "Tech Solutions"
Necessidade: Portal de e-commerce completo
Prazo: 4 meses
```

**2. Você especifica no Claude:**
```
Crie cotação para "Tech Solutions - E-commerce":
- Catálogo de Produtos: 120h, margem 60%
- Carrinho e Checkout: 100h, margem 60%
- Integração Pagamento: 80h, margem 65%
- Painel Administrativo: 100h, margem 55%
- Integrações (ERP/CRM): 120h, margem 70%
- Testes e QA: 80h, margem 50%
Tipo: Projetos
Observação: "Cliente premium, projeto estratégico, suporte pós-go-live incluído"
```

**3. Claude retorna resumo:**
```
Cotação criada! ID: 1738782456789
Valor Total: R$ 115.234,80
Total de Horas: 600h
```

**4. Você revisa detalhes:**
```
Mostre detalhes completos da cotação #1738782456789
```

**5. Você copia para proposta:**
```
[Usa botão "Copiar" na UI ou pede ao Claude]
"Copie os dados da cotação #1738782456789 em formato de proposta comercial"
```

**6. Cliente aprova → salvo no histórico!**

---

## 💡 Dicas Pro

### 1. Nomenclatura Clara
```
✅ BOM: "Banco ABC - Portal Internet Banking v2.0"
❌ RUIM: "Projeto 1"
```

### 2. Observações Detalhadas
```
✅ BOM: "Cliente premium, contrato anual, revisão trimestral, pagamento NET30"
❌ RUIM: "Cliente importante"
```

### 3. Breakdown Lógico
```
✅ BOM: Dividir por módulos/fases
- Backend API
- Frontend Web
- Mobile App
- Integrações

❌ RUIM: Tudo em um único projeto
- Desenvolvimento completo: 500h
```

### 4. Use IDs Descritivos
```
Sempre pegue o ID retornado para referências futuras:
"ID: 1738782456789" → Anote no CRM/Sistema
```

---

## 📋 Checklist de Cotação Completa

Antes de criar uma cotação, tenha:

- [ ] Nome do cliente/projeto
- [ ] Tipo (Projetos 62,25 ou Sustentação 49,11)
- [ ] Lista de atividades/módulos
- [ ] Estimativa de horas por atividade
- [ ] Margem desejada (geralmente 50-65%)
- [ ] Comissão se aplicável (0-15%)
- [ ] Observações relevantes
- [ ] Prazo estimado (para observações)
- [ ] Termos comerciais (para observações)

---

## 🎯 Resultado Esperado

Após seguir estes exemplos, você terá:

✅ Cotações organizadas e padronizadas
✅ Histórico completo de propostas
✅ Análises de precificação
✅ Dados estruturados para relatórios
✅ Workflow eficiente de vendas
✅ Rastreabilidade de propostas
✅ Base para decisões comerciais

---

**Pronto para começar?** Configure o MCP no Claude Desktop e comece a criar cotações!
