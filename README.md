# NestJS Articles API — Teste Técnico

API RESTful desenvolvida com **NestJS + TypeORM + PostgreSQL + Docker**, aplicando princípios de **SOLID**, **Clean Architecture** e **Dependency Injection**.

---

## 🚀 Funcionalidades

- Autenticação JWT (com níveis de permissão)
- CRUD completo de **Usuários**, **Artigos** e **Permissões**
- Controle de acesso com **RolesGuard**
- Seeds automáticas:
  - Criação das permissões (`Admin`, `Editor`, `Reader`)
  - Criação do usuário `root` (Admin)
- Arquitetura modular e escalável

---

## 🧱 Estrutura do Projeto

```bash
src/
├── app.module.ts
├── main.ts
├── common/             # Decorators, enums e utilitários
├── config/             # Configurações do projeto e banco
├── core/               # Camada de domínio (entidades, interfaces e casos de uso)
├── infra/              # Camada de infraestrutura (ORM, Auth, Seeds)
├── modules/            # Camada de aplicação (controllers, services)
└── ...
```

**Padrões aplicados:**
- **S**ingle Responsibility — classes com responsabilidade única  
- **O**pen/Closed — extensível via interfaces  
- **L**iskov Substitution — módulos podem trocar repositórios sem quebrar  
- **I**nterface Segregation — contratos específicos para cada entidade  
- **D**ependency Inversion — dependência de abstrações, não implementações  

---

## ⚙️ Requisitos

- Node.js 20+
- Docker e Docker Compose
- Postman (para testes)

---

## 🐳 Subir o ambiente

```bash
docker compose up --build
```

O servidor estará disponível em:  
👉 [http://localhost:3000](http://localhost:3000)

---

## 🧑‍💻 Usuário Padrão (seed)

| Campo | Valor                                     |
| ----- | ----------------------------------------- |
| Email | [admin@admin.com](mailto:admin@admin.com) |
| Senha | 123456                                    |
| Role  | Admin                                     |

---

## 🔐 Endpoints principais

| Método | Rota           | Descrição                             | Permissão    |
| ------ | -------------- | ------------------------------------- | ------------ |
| POST   | `/auth/login`  | Autentica usuário e retorna token JWT | Público      |
| GET    | `/users`       | Lista usuários                        | Admin        |
| POST   | `/users`       | Cria novo usuário                     | Admin        |
| GET    | `/articles`    | Lista artigos                         | Público      |
| POST   | `/articles`    | Cria artigo                           | Admin/Editor |
| GET    | `/permissions` | Lista permissões                      | Admin        |

---

## 🧩 Testes no Postman

1. Importe o arquivo `nest-articles-api.postman_collection.json`  
2. Execute o request **Auth → Login**  
3. O token será armazenado automaticamente  
4. Teste as rotas protegidas (`/users`, `/articles`, `/permissions`)

---

## 🧠 Arquitetura de Dependências

```
┌─────────────────────┐
│  Controller (HTTP)  │  → Recebe requisições
└────────┬────────────┘
         ↓
┌─────────────────────┐
│   Service (App)     │  → Orquestra regras de negócio
└────────┬────────────┘
         ↓
┌─────────────────────┐
│ Repository (Infra)  │  → Implementa interface de persistência
└────────┬────────────┘
         ↓
┌─────────────────────┐
│   Entity (Domain)   │  → Define o modelo do domínio
└─────────────────────┘
```

---

## 🧾 Tecnologias Utilizadas

- **NestJS** — Framework principal  
- **TypeORM** — ORM relacional  
- **PostgreSQL** — Banco de dados  
- **JWT + Passport** — Autenticação  
- **Bcrypt** — Hash de senhas  
- **Docker Compose** — Infraestrutura containerizada  

---

## 💡 Possíveis melhorias futuras

- Implementar testes unitários (Jest)  
- Adicionar versionamento de API (v1, v2)  
- Criar camada de *use-cases* isolada (DDD)  
- Implementar Swagger para documentação automática  
- Adicionar auditoria (timestamps, logs)  

---

## 🧪 Testes

A aplicação conta com testes **unitários e de integração** utilizando o **Jest**, nativo do NestJS.

### 🧠 Estrutura de testes

```bash
test/
├── users.service.spec.ts      # Testes unitários do UsersService
├── auth.service.spec.ts       # Testes unitários do AuthService
└── app.e2e-spec.ts            # Teste de integração básico da API
```

### 🧩 Executando os testes

```bash
# Executa todos os testes
npm run test

# Executa em modo watch (recarrega automaticamente)
npm run test:watch
```

💡 **Se estiver usando Docker:**

```bash
# Rodar testes dentro do container ativo
docker exec -it nest-api npm run test

# Ou rodar em container temporário
docker compose run --rm api npm run test
```

---

### ✅ Cobertura dos testes

- Criação e listagem de usuários (`UsersService`)  
- Autenticação e validação de credenciais (`AuthService`)  
- Endpoint público `/articles` (teste de integração)  
- Simulação de fluxo JWT básico  

**Exemplo de resultado esperado:**

```
 PASS  test/users.service.spec.ts
 PASS  test/auth.service.spec.ts
 PASS  test/app.e2e-spec.ts

Test Suites: 3 passed, 3 total
Tests:       5 passed, 5 total
Time:        4.12 s
```

---

## 🧑‍💼 Autor

**Gerlisson Paulino**  
Senior Full Stack Developer • PHP | Node.js | Vue | React | AWS  
📧 [gerlisson.paulino@gmail.com](mailto:gerlisson.paulino@gmail.com)

---
