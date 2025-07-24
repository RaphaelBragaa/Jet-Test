# Jet-Test: Desafio Técnico – Backend e Frontend

## Índice

- [Jet-Test: Desafio Técnico – Backend e Frontend](#jet-test-desafio-técnico--backend-e-frontend)
  - [Índice](#índice)
  - [Tecnologias Utilizadas](#tecnologias-utilizadas)
  - [Como Executar Localmente](#como-executar-localmente)
    - [Pré-requisitos](#pré-requisitos)
    - [Configuração do Ambiente](#configuração-do-ambiente)
    - [Rodando com Docker Compose](#rodando-com-docker-compose)
    - [Rodando Manualmente](#rodando-manualmente)
  - [Uso da API](#uso-da-api)
    - [Cadastro de Tarefas (Protegido por JWT)](#cadastro-de-tarefas-protegido-por-jwt)
      - [Gerando o Token JWT para Testes](#gerando-o-token-jwt-para-testes)
    - [Listagem de Tarefas](#listagem-de-tarefas)
  - [Frontend React](#frontend-react)
    - [Como Rodar o Frontend](#como-rodar-o-frontend)
  - [Testes Automatizados](#testes-automatizados)
  - [Extras e Diferenciais Implementados](#extras-e-diferenciais-implementados)
  - [Observações](#observações)

## Tecnologias Utilizadas

- **Backend:** Node.js, Express, TypeScript, Prisma ORM, SQLite, JWT, BullMQ (diferencial), Redis (via Docker)
- **Frontend:** React, TypeScript, Vite, Axios
- **Infraestrutura:** Docker, Docker Compose
- **Testes:** Jest, Supertest

## Como Executar Localmente

### Pré-requisitos

- [Node.js](https://nodejs.org/) (versão 18 ou acima)
- [Docker](https://www.docker.com/) e [Docker Compose](https://docs.docker.com/compose/)
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)


### Configuração do Ambiente

1. **Clone o repositório:**

```sh
git clone https://github.com/RaphaelBragaa/Jet-Test.git
cd Jet-Test
```

2. **Crie o arquivo `.env` na raiz do backend:**

```
# .env
DATABASE_URL="file:./dev.db"
JWT_SECRET=sua_chave_supersecreta
REDIS_HOST=redis
REDIS_PORT=6379
WEBHOOK_URL=https://webhook.site/endpoint-exemplo # se usar diferenciado
```


### Rodando com Docker Compose

> Este comando sobe API, banco (SQLite arquivo local) e Redis juntos para BullMQ.

```sh
docker-compose up --build
```

- A API ficará acessível em `http://localhost:5000`
- O Redis estará disponível em `localhost:6379` para filas


### Rodando Manualmente

1. **Instale as dependências:**

```sh
cd Back-End
npm install
```

2. **Rode as migrations do banco:**

```sh
npx prisma migrate dev
```

3. **Inicie o servidor:**

```sh
npm run start
```


---

## Uso da API

### Cadastro de Tarefas (Protegido por JWT)

- **Endpoint:** `POST /tarefas`
- **Headers:** `Authorization: Bearer <token_jwt_válido>`
- **Corpo JSON:**

```json
{
  "titulo": "Título da tarefa",
  "descricao": "Descrição detalhada",
  "horarioExecucao": "2025-07-26T19:00:00.000Z"
}
```

- **Respostas possíveis:**
    - `201 Created` – Retorna tarefa criada
    - `401 Unauthorized` – Token ausente ou inválido
    - `400 Bad Request` – Dados obrigatórios faltando ou data no passado


#### Gerando o Token JWT para Testes

Para este desafio, **não é necessário rota de login**. Gere um token manualmente assim:

```sh
node
```

```js
const jwt = require('jsonwebtoken');
const token = jwt.sign({ usuario: 'teste' }, 'sua_chave_supersecreta', { expiresIn: '2d' });
console.log(token);
```

- Copie o token e use no header Authorization.


### Listagem de Tarefas

- **Endpoint:** `GET /tarefas`
- **Acesso:** Público, não requer token
- **Resposta:**

```json
{
  "tarefas": [
    {
      "id": 1,
      "titulo": "Título",
      "descricao": "Descrição",
      "horarioExecucao": "2025-07-26T19:00:00.000Z"
    }
  ]
}
```


## Frontend React

A interface lista todas as tarefas cadastradas via API.

### Como Rodar o Frontend

1. Entre na pasta do frontend:

```sh
cd Front-End
npm install
```

2. Edite `.env` para apontar para a API:

```
VITE_API_URL=http://localhost:5000
```

3. Inicie o app:

```sh
npm run dev
```


- Acesse em `http://localhost:5173` (ou porta informada no terminal)


## Testes Automatizados

- Os testes estão em `src/test/integration/tarefa.test.ts` (backend).
- Utilize:

```sh
npm test
```

- Testes cobrem:
    - Cadastro (com/sem token, inválido)
    - Listagem
    - Validações de dados


## Extras e Diferenciais Implementados

- **BullMQ + Redis:** Estrutura inicial para fila assíncrona e agendamento de webhook.
- **Webhook:** Código pronto para envio de POST 5 minutos antes do horário da tarefa usando job agendado na fila.
- **Docker Compose:** API + Redis prontos para uso.
- **Prisma ORM, testes integrados, código modular e documentado.**


## Observações

- O token JWT pode ser criado manualmente, como orientado acima — não existe rota de cadastro/login de usuário.
- Para testar notificações assíncronas e webhook, configure seu endpoint no `.env`.
- O frontend é simples, funcional e consome a API de listagem conforme pedido.
- Todos os comandos para iniciar a stack estão no README e no docker-compose.

**Qualquer dúvida, sugestão ou problema durante a avaliação, consulte este README ou entre em contato!**
