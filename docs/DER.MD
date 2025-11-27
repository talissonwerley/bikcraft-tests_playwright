# Documento de Especificações de Requisitos  
## Projeto de Testes Automatizados – Bikcraft

---

## 1. Contexto do Projeto

O objetivo deste projeto é automatizar testes funcionais e de regressão para o site de vendas de bicicletas **Bikcraft**:

https://bikcraft-gamma.vercel.app/

A automação focará em:

- Fluxo do usuário  
- Navegação  
- Interações  
- Envio de formulários  

O propósito é garantir a qualidade e estabilidade das funcionalidades principais do site.

---

## 2. Objetivos dos Testes

- Validar funcionalidades essenciais, incluindo navegação, consulta de bicicletas, simulação de orçamento, contato, contratação de seguros e finalização de compra (checkout).  
- Garantir que as páginas carreguem corretamente, com elementos visíveis e funcionais.  
- Detectar regressões em funcionalidades já existentes.  
- Criar uma base de testes modular, escalável e de fácil manutenção.

---

## 3. Escopo dos Testes

Os testes contemplam as páginas e fluxos principais abaixo:

### Tabela de Escopo

| Página / Fluxo | Objetivo do Teste | Principais Funcionalidades a Testar |
|----------------|-------------------|-------------------------------------|
| **HomePage** | Validar carregamento e navegação geral | Visibilidade dos elementos principais; links funcionais |
| **BikesPage** | Listagem de bicicletas, filtros e detalhes | Filtros, detalhes de produto, botão de orçamento |
| **SegurosPage** | Contratação de seguro para bicicletas | Formulário de seguro, validações, submissão |
| **ContatoPage** | Envio de mensagens e dados para contato | Formulário de contato, validação de campos |
| **OrcamentoPage** | Simulação de orçamento | Seleção de bike, valores, simulação e cálculo |

---

## 4. Estrutura e Organização dos Arquivos

- `pages/`: Objetos de página (Page Objects) contendo seletores e métodos de interação.  
- `tests/`: Arquivos de testes automatizados divididos por fluxo/página.  
- `fixtures/`: Configuração de contexto, dados iniciais, instâncias de pages.  
- `utils/`: Funções auxiliares e módulos reutilizáveis.  
- `playwright.config.js`: Arquivo de configuração principal.

---
| **ContatoPage** | Envio de mensagens e dados para contato | Formulário de contato, validação de campos |
| **OrcamentoPage** | Simulação de orçamento | Seleção de bike, valores, simulação e cálculo |

---

## 4. Estrutura e Organização dos Arquivos

A estrutura de diretórios segue o padrão de Page Objects e testes modulares:
```
project/
│
├── pages/
│ ├── home.page.js
│ ├── bikes.page.js
│ ├── seguros.page.js
│ ├── contato.page.js
│ └── orcamento.page.js
│
├── tests/
│ ├── home.spec.js
│ ├── bikes.spec.js
│ ├── seguros.spec.js
│ ├── contato.spec.js
│ └── orcamento.spec.js
│
├── fixtures/
│ └── test-data.json
│
├── utils/
│ └── helpers.js
│
└── playwright.config.js
```


---

## 5. Requisitos Funcionais (RF)

### RF001 — Carregamento das Páginas
O sistema deve carregar todas as páginas do site com seus elementos principais visíveis e funcionais.

### RF002 — Listagem de Bicicletas
O usuário deve ser capaz de visualizar a lista de bicicletas, acessar seus detalhes e solicitar orçamento.

### RF003 — Formulário de Contato
O usuário deve conseguir preencher e enviar o formulário de contato com validação dos campos obrigatórios.

### RF004 — Simulação de Orçamento
O usuário deve escolher um modelo de bicicleta e receber a simulação de valores.

### RF005 — Contratação de Seguros
O usuário deve conseguir preencher e enviar o formulário com dados para contratação de seguro.

---

## 6. Requisitos Não Funcionais (RNF)

### RNF001 — Performance
As páginas devem carregar em até **3 segundos** em rede estável.

### RNF002 — Usabilidade
Os elementos interativos devem ser facilmente identificáveis e responder a comandos do usuário.

### RNF003 — Confiabilidade dos Testes
Os testes automatizados devem apresentar taxa mínima de **95% de sucesso**, exceto em casos de falha real do sistema.

---

## 7. Cenários de Teste (Resumo)

### HomePage
- Verificar carregamento da página
- Validar links de navegação
- Testar redirecionamentos

### BikesPage
- Listar bicicletas disponíveis  
- Validar filtros  
- Clicar na primeira bicicleta e abrir página de detalhes  
- Testar botão "Orçamento"

### SegurosPage
- Validar formulário de seguro  
- Testar envio com dados válidos  
- Testar alertas de campos obrigatórios

### ContatoPage
- Preencher formulário de contato  
- Enviar mensagem  
- Validar mensagens de erro

### OrcamentoPage
- Selecionar modelo  
- Preencher dados  
- Validar cálculo e envio

---

## 8. Critérios de Aceite

- Todos os elementos principais devem ser detectáveis pelo Playwright.  
- Nenhum teste funcional crítico pode falhar.  
- O ambiente deve permitir execução contínua (CI).

---

## 9. Tecnologia Utilizada

- **Node.js**
- **Playwright**
- **JavaScript**
- **Page Object Model (POM)**

---

## 10. Comandos de Execução

### Instalar navegadores do Playwright
```bash
npx playwright install
```
### Rodar todos os testes
```bash
npx playwright test
```
### Rodar teste específico
```bash
npx playwright test tests/bikes.spec.js
```
### Rodar em modo UI
```bash
npx playwright test --ui
```
## 11. Considerações Finais
Este documento define a base para implementação dos testes automatizados do site Bikcraft,
garantindo qualidade, escalabilidade e padronização no desenvolvimento e manutenção dos testes.