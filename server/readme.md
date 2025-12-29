# 📚 Book Publishing System: Config-Driven Audit Trail

A minimal **Book Publishing backend system** built with **Node.js, TypeScript, Express, and MongoDB**, with a strong focus on **auditability, observability, access control, and clean architecture**.

This project demonstrates how to build an **auditable application** where **new entities can be added to audit tracking purely via configuration**, without invasive code changes.

---

## ✨ Key Features

* ✅ CRUD APIs for **Books**
* 🔐 **JWT Authentication** with role-based access control (Admin / Reviewer)
* 🧾 **Config-driven Audit Trail**
* 📊 Rich audit filtering (entity, actor, action, time range, etc.)
* 🧵 **Request tracing** using AsyncLocalStorage (`requestId`, `userId`)
* 🪵 **Structured logging** using Pino (file-based, configurable)
* 🧱 Clean layered architecture (routes → services → models)
* 🌱 Seed script for demo users
* ⚙️ TypeScript strict mode enabled

---

## 🧠 Audit Trail Design (Core Highlight)

Audit tracking is controlled via a **single configuration object**:

```ts
export const auditConfig = {
  Book: {
    track: true,
    exclude: ['updatedAt'],
    redact: [],
  },
  User: {
    track: true,
    exclude: ['credentials'],
    redact: ['credentials'],
  },
} as const
```

### What this enables:

* Add a new auditable entity by **updating config only**
* Exclude non-meaningful fields (e.g. `updatedAt`)
* Redact sensitive fields (e.g. credentials)
* No changes required in business logic

Each audit log captures:

* entity
* entityId
* action (create / update / delete)
* actorId
* timestamp
* diff (before/after)
* requestId (traceability)

---

## 🏗️ Tech Stack

| Layer         | Technology               |
| ------------- | ------------------------ |
| Runtime       | Node.js (≥ 20)           |
| Language      | TypeScript               |
| Framework     | Express                  |
| Database      | MongoDB (Atlas or local) |
| ORM           | Mongoose                 |
| Auth          | JWT                      |
| Logging       | Pino                     |
| Observability | AsyncLocalStorage        |

---

## 📁 Project Structure

```
server/
├── src/
│   ├── app.ts                # Express app setup
│   ├── server.ts             # Server bootstrap
│   ├── config/               # Env, audit config, logger
│   ├── db/                   # MongoDB connection
│   ├── middleware/           # Auth, RBAC, error, context
│   ├── models/               # Mongoose models
│   ├── services/             # Business logic + audit hooks
│   ├── routes/               # API routes
│   ├── utils/                # Diff & cursor utilities
│   └── seed.ts               # Seed script
│
├── logs/app.log               # Application logs
├── package.json
└── tsconfig.json
```

---

## 🔐 Authentication & Access Control

* JWT-based authentication
* Roles:

  * **admin**
  * **reviewer**

### RBAC Rules

| Endpoint   | Admin | Reviewer |
| ---------- | ----- | -------- |
| Books CRUD | ✅     | ✅        |
| Audit APIs | ✅     | ❌        |

---

## 📡 API Endpoints

### Auth

```
POST /api/auth/login
```

### Books

```
GET    /api/books
POST   /api/books
PATCH  /api/books/:id
DELETE /api/books/:id
```

### Audits (Admin only)

```
GET /api/audits
GET /api/audits/:id
```

#### Audit Filters (all optional)

* `entity`
* `entityId`
* `actorId`
* `action`
* `from`
* `to`
* `limit`

---

## 🪵 Logging & Observability

* Logs written to `logs/app.log`
* Each log line includes:

  * `requestId`
  * `userId`
  * timestamp
* Uses AsyncLocalStorage to propagate context across async calls
* Logging sink can be switched (Elastic / Logtail) via config

---

## ❌ Error Handling

Centralized error handler returns consistent responses:

```json
{
  "error": {
    "code": "INTERNAL_ERROR",
    "message": "Something went wrong"
  }
}
```

No stack traces are leaked in production.

---

## 🗄️ Database Choice

**MongoDB** was chosen because:

* Easy local and cloud (Atlas) setup
* Flexible schema (useful for audit diffs)
* Fast iteration for backend-heavy assignments

---

## 🚀 Running the Project

### 1. Install dependencies

```bash
npm install
```

### 2. Create `.env`

```env
PORT=4000
MONGO_URI=mongodb://<your host add>/book_audits
JWT_SECRET=<jwt secret key>
```

> Ensure IP is whitelisted in MongoDB Atlas.

---

### 3. Seed users

```bash
npm run seed
```

Creates:

* Admin user
* Reviewer user

---

### 4. Start server

```bash
npm run dev
```

Server runs at:

```
http://localhost:4000
```

---

## 🧪 Sample cURL Commands

### Login

```bash
curl -X POST http://localhost:4000/api/auth/login \
-H "Content-Type: application/json" \
-d '{"name":"Admin","credentials":"admin123"}'
```

### Create Book

```bash
curl -X POST http://localhost:4000/api/books \
-H "Authorization: Bearer <TOKEN>" \
-H "Content-Type: application/json" \
-d '{"title":"Clean Code","authors":"Robert C Martin"}'
```

### View Audit Logs

```bash
curl http://localhost:4000/api/audits \
-H "Authorization: Bearer <ADMIN_TOKEN>"
```

---

## ✅ What This Project Demonstrates

* Strong audit trail design
* Clean extensibility via configuration
* Proper auth & RBAC
* Observability and traceability
* Production-quality TypeScript backend practices

---

## 📌 Future Improvements (Optional)

* Cursor-based pagination
* Soft delete + restore
* Password hashing
* Docker support
* Fastify migration

---

## 👤 Author

I built this as a **technical assignment submission** to demonstrate backend engineering, audit design, and system thinking.

---
