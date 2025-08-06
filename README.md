# teste-pratico-wegen

Projeto fullstack para gestão de tarefas, desenvolvido como teste prático.

## Estrutura do Projeto

```
├── backend/
│   └── TaskManagerAPI/   # API ASP.NET Core
├── frontend/
│   └── src/              # SPA React + TypeScript
└── README.md
```

---

## Backend

- **Tecnologia:** ASP.NET Core (.NET 9)
- **Banco de dados:** PostgreSQL
- **Principais recursos:**
  - Autenticação JWT
  - CRUD de tarefas
  - Migrations via Entity Framework Core
  - Endpoints RESTful

### Como foi montado

1. Criado projeto ASP.NET Core Web API (`dotnet new webapi`).
2. Configurado Entity Framework Core para PostgreSQL.
3. Implementado modelo de usuário e tarefa.
4. Criados controllers para autenticação e tarefas.
5. Adicionado autenticação JWT.
6. Migrations aplicadas para criar as tabelas.

---

## Frontend

- **Tecnologia:** React + TypeScript
- **UI:** Material UI + TailwindCSS
- **Principais recursos:**
  - SPA com rotas protegidas
  - Modais de confirmação, sucesso e erro
  - Feedback visual para todas ações
  - Integração com API via Axios
  - Autenticação e armazenamento do token

### Como foi montado

1. Criado projeto React com TypeScript (`npx create-react-app frontend --template typescript`).
2. Instalado Material UI e TailwindCSS para estilização.
3. Implementados componentes de formulário, tabela, modais e contexto de autenticação.
4. Integração com API usando Axios, incluindo envio do token JWT.
5. Feedback visual para todas ações (loading, sucesso, erro).

---

## Como rodar localmente

### Pré-requisitos

- Node.js >= 18
- .NET 9 SDK
- PostgreSQL rodando localmente

### 1. Clonar o repositório

```bash
git clone https://github.com/Lu1zH3nriq/teste-pratico-wegen.git
cd teste-pratico-wegen
```

### 2. Configurar o banco de dados

Crie um banco PostgreSQL local e configure a string de conexão em `backend/TaskManagerAPI/appsettings.json`.

#### OBSERVAÇÃO :

O projeto foi montado em desenvolvimento com uma conexão com o PostgreSQL na Aiven, com as seguintes credenciais:
pode ser utilizado para testes, também acompanha a chave JWT para autenticação.

```bash
appsettings.json e appsettings.Development.json
{
  "ConnectionStrings": {
    "Postgres": {
      "Host": "db-teste-pratico-wegen-teste-pratico-wegen.f.aivencloud.com",
      "Port": "24149",
      "Database": "taskManagerDB",
      "Username": "avnadmin",
      "Password": "AVNS_dLZ8zXrWlb6B2QTkCDE",
      "SSL": "Require"
    }
  },
  "Jwt": {
    "Key": "LuizHenriqueRodriguesMendes@2025APITASK",
    "Issuer": "TaskManagerAPI",
    "Audience": "TaskManagerUsers"
  },
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft": "Warning",
      "Microsoft.Hosting.Lifetime": "Information"
    }
  },
  "AllowedHosts": "*"
}

```

### 3. Rodar o backend

```bash
cd backend/TaskManagerAPI
dotnet restore
dotnet ef database update   # aplica as migrations
dotnet run
```

O backend estará disponível em `http://localhost:5289`.

### 4. Rodar o frontend

Abra outro terminal:

```bash
cd frontend
npm install
npm start
```

O frontend estará disponível em `http://localhost:3000`.

---

## Observações

- O login e registro exigem usuário e senha válidos.
- O token JWT é salvo no localStorage e usado em todas requisições protegidas.
- Modais exibem feedback visual para todas ações (cadastro, edição, exclusão).

---

## Contato

Em caso de dúvidas, entre em contato pelo GitHub: [Lu1zH3nriq](https://github.com/Lu1zH3nriq)
