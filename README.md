# Config-Driven Audit Trail System

A minimal Book Publishing API with CRUD operations, authentication, and a config-driven audit trail.

## Tech Stack

- **Backend**: Node.js + TypeScript, Express, MongoDB + Mongoose
- **Frontend**: React + TypeScript, Vite, Tailwind CSS
- **Auth**: API Key based
- **Logging**: Pino with file transport (configurable)
- **Validation**: Zod

## Database Choice

MongoDB was chosen for its flexibility with document-based storage, ease of local setup with Docker, and good support for audit trails with embedded diffs. It's suitable for a small-scale application and can handle JSON-like data structures well.

## Setup

1. Install dependencies:
   ```bash
   cd server && npm install
   cd ../frontend && npm install
   ```

2. Start MongoDB (locally or via Docker):
   ```bash
   docker run -d -p 27017:27017 mongo
   ```

3. Seed the database:
   ```bash
   cd server && npm run seed
   ```

4. Start the backend:
   ```bash
   cd server && npm run dev
   ```

5. Start the frontend:
   ```bash
   cd frontend && npm run dev
   ```

## Switching Log Sinks

Set the `LOG_TRANSPORT` environment variable:
- `file` (default): Logs to `./logs/app.log`
- `elastic`: Placeholder for Elasticsearch (requires `pino-elasticsearch`)

Example:
```bash
LOG_TRANSPORT=elastic npm run dev
```

## Audit Config

The audit trail is controlled by `server/src/config/audit.config.ts`. To add a new entity:

```typescript
export const auditConfig = {
  Book: { track: true, exclude: ['updatedAt'], redact: [] },
  User: { track: true, exclude: ['apiKey'], redact: ['apiKey'] },
  NewEntity: { track: true, exclude: [], redact: [] },
} as const
```

Then update the service to call `createAudit` on changes.

## API Examples

### Books

List books:
```bash
curl -H "x-api-key: admin123" http://localhost:4000/api/books?limit=10
```

Create book:
```bash
curl -X POST -H "x-api-key: admin123" -H "Content-Type: application/json" \
  -d '{"title":"New Book","authors":"Author","publishedBy":"Publisher"}' \
  http://localhost:4000/api/books
```

### Audits (Admin only)

List audits:
```bash
curl -H "x-api-key: admin123" "http://localhost:4000/api/audits?entity=Book&limit=20"
```

Filter by date:
```bash
curl -H "x-api-key: admin123" "http://localhost:4000/api/audits?from=2023-01-01T00:00:00Z&to=2023-12-31T23:59:59Z"
```

## Demo Users

- Admin: `admin123`
- Reviewer: `reviewer123`