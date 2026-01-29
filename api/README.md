# 📘 Documentação – Testes Automatizados de API REST com Cypress

## 📌 Visão Geral
Este projeto tem como objetivo validar automaticamente os endpoints de uma **API REST** desenvolvida no contexto do projeto **Webdojo**, utilizando o **Cypress** como ferramenta de testes automatizados.

Além dos testes automatizados, o projeto também contou com **testes manuais realizados com a ferramenta Bruno**, garantindo a validação inicial e o entendimento do comportamento dos endpoints antes da automação.

---

## 🛠️ Tecnologias Utilizadas

- **Node.js** – Backend da API  
- **Express** – Framework para criação da API REST  
- **PostgreSQL** – Banco de dados  
- **Prisma ORM** – Camada de acesso a dados  
- **Docker** – Containerização do banco de dados  
- **pgAdmin** – Gerenciamento visual do PostgreSQL  
- **Cypress** – Testes automatizados de API  
- **Bruno** – Testes manuais de endpoints  

---

## 🌐 Contexto da Aplicação

- **API REST** executando em:
  ```
  http://localhost:3333
  ```

- **Banco de dados PostgreSQL** executando em container Docker  
- **pgAdmin** utilizado para acessar e gerenciar o banco de dados  

---

## 📂 Estrutura do Projeto

```text
cypress/
 ├── e2e/
 │   ├── get.cy.js
 │   ├── post.cy.js
 │   ├── put.cy.js
 │   └── delete.cy.js
 │
 ├── fixtures/
 │   └── example.json
 │
 ├── support/
 │   ├── commands.js
 │   ├── database.js
 │   └── e2e.js
```

### 📁 Descrição das pastas

- **e2e/**  
  Contém os testes automatizados organizados por método HTTP:
  - `GET`
  - `POST`
  - `PUT`
  - `DELETE`

- **fixtures/**  
  Dados mockados utilizados nos testes.

- **support/**  
  - Comandos customizados  
  - Funções auxiliares de banco de dados  
  - Configurações globais do Cypress  

---

## ▶️ Scripts Disponíveis

```json
"scripts": {
  "start": "node index.js",
  "dev": "nodemon index.js",
  "test": "echo \"Error: no test specified\" && exit 1"
}
```

### 📌 Descrição dos scripts

- **start** – Inicia a API em modo produção  
- **dev** – Inicia a API em modo desenvolvimento  

---

## 🧪 Execução dos Testes Automatizados

### Pré-requisitos

- Node.js instalado  
- Docker em execução  
- Banco PostgreSQL ativo  
- API rodando em `localhost:3333`  

### Executar Cypress em modo interativo

```bash
npx cypress open
```

### Executar Cypress em modo headless

```bash
npx cypress run
```

---

## 🔍 Testes Manuais

Os testes manuais foram executados com a ferramenta **Bruno**, auxiliando na validação dos endpoints, entendimento das regras de negócio e apoio à automação.

---

## 🧠 Boas Práticas Aplicadas

- Organização por método HTTP  
- Uso de fixtures  
- Reutilização de código  
- Validação de status code e payload  
- Apoio ao banco de dados nos testes  

---

## 🎯 Objetivo dos Testes

Garantir a qualidade, confiabilidade e consistência da API REST, apoiando a evolução contínua do projeto.

---

📌 *Projeto desenvolvido para fins de estudo e evolução em Qualidade de Software.*

**Responsável:**  
Bruna Cristina Lemes
