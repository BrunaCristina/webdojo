# 📌 Projeto de Testes Automatizados – Webdojo (Cypress)

Este repositório contém os **testes automatizados da aplicação Webdojo**, desenvolvidos com **Cypress**, visando garantir a qualidade, estabilidade e performance da aplicação Web.

---

## 🧪 Tecnologias Utilizadas

- **Cypress** – Framework de testes end-to-end
- **JavaScript**
- **Node.js / NPM**
- **Serve** – Para subir a aplicação localmente
- **Webdojo** – Aplicação Web testada

---

## 📂 Estrutura do Projeto

A estrutura de testes Cypress está organizada da seguinte forma:

```text
cypress
├── e2e
│   └── (arquivos de testes .cy.js)
├── fixtures
│   ├── cep.json
│   ├── consultancy.json
│   └── CheckListPerformance.pdf
├── support
│   ├── actions
│   │   ├── consultancy.actions.js
│   │   └── utils.js
│   └── e2e.js
```

### 📁 Descrição das Pastas

#### `cypress/e2e`
Contém os **cenários de testes automatizados**, escritos no formato `.cy.js`, organizados por funcionalidades da aplicação Webdojo.

#### `cypress/fixtures`
Armazena **dados mockados e arquivos estáticos** utilizados durante os testes.

#### `cypress/support`
Centraliza **configurações e funções reutilizáveis**.

---

## ▶️ Pré-requisitos

- Node.js (LTS)
- NPM
- Dependências instaladas:

```bash
npm install
```

---

## 🚀 Executando a Aplicação Webdojo

A aplicação Webdojo está no **mesmo repositório**.

```bash
npm run dev
```

A aplicação será iniciada na porta **3000**.

---

## 🧪 Executando os Testes Automatizados

### Headless (CI)

```bash
npm run test
```

### Interface Gráfica

```bash
npm run test:ui
```

### Login Mobile

```bash
npm run test:login:mobile
```

---

## ⚙️ Scripts

```json
"scripts": {
  "dev": "serve -s dist -p 3000",
  "test": "npx cypress run --config viewportWidth=1440,viewportHeight=900",
  "test:ui": "npx cypress open",
  "test:login:mobile": "npx cypress run --spec cypress/e2e/login.cy.js --config viewportWidth=414,viewportHeight=896"
}
```

---

## 📌 Observações

- Execute a aplicação antes dos testes
- Use o modo UI para debug

---

**Responsável:**  
Bruna Cristina Lemes
