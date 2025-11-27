# 🧪 Testes Automatizados – Bikcraft

Automação de testes end-to-end utilizando **Playwright** para validar funcionalidades do site Bikcraft.

🔗 **Projeto alvo:** https://bikcraft-gamma.vercel.app/  
📦 **Tecnologias:** Playwright, JavaScript, Node.js

---

## 📌 Sobre o Projeto

Este repositório contém a suíte de testes automatizados desenvolvida para o site **Bikcraft**, com foco em:

- Validação do fluxo do usuário
- Navegação entre páginas
- Interações com elementos
- Envio de formulários
- Simulação de orçamento
- Detecção de regressões
- Garantia de estabilidade e qualidade

## Os testes seguem o padrão **Page Object Model (POM)** para manter organização, modularidade e facilidade de manutenção.

## 📁 Estrutura do Projeto

```
bikcraft-tests_playwright/
│
├── pages/ # Page Objects
│ ├── home.page.js
│ ├── bikes.page.js
│ ├── seguros.page.js
│ ├── contato.page.js
│ └── orcamento.page.js
│
├── tests/ # Arquivos de teste (specs)
│ ├── home.spec.js
│ ├── bikes.spec.js
│ ├── seguros.spec.js
│ ├── contato.spec.js
│ └── orcamento.spec.js
│
├── fixtures/ # Massa de dados
│ └── test-data.json
│
├── utils/ # Funções auxiliares
│ └── helpers.js
│
├── playwright.config.js # Configuração principal do Playwright
└── package.json
```

---

## 🚀 Instalação e Execução

### 🔧 Pré-requisitos

- Node.js instalado
- npm ou yarn
- Git

### 📥 1. Clone o repositório

```bash
git clone https://github.com/talissonwerley/bikcraft-tests_playwright
cd bikcraft-tests_playwright
```

### 2. Instale as dependências

```
npm install
```

## 🌐 3. Instale os navegadores do Playwright

```
npx playwright install
```

## ▶️ 4. Execute todos os testes

```
npx playwright test
```

## 🧭 Executar testes em modo UI (visual)

```
npx playwright test --ui
```

## 📝 Executar um teste específico

```
npx playwright test tests/bikes.spec.js
```
