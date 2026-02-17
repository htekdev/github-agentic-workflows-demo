# Copilot Instructions

## Project Overview

This is a **Task Tracker REST API** built to demonstrate GitHub Agentic Workflows. The codebase is intentionally simple — it's a demo, not a production application.

## Tech Stack

- **Runtime:** Node.js 22
- **Framework:** Express 5
- **Module System:** ESM (`"type": "module"` in package.json)
- **Testing:** Vitest + Supertest
- **Storage:** In-memory `Map` (no database)

## Code Conventions

- Use ESM imports/exports (`import`/`export`, not `require`)
- Use `const` by default, `let` when reassignment is needed
- Prefer arrow functions for callbacks and inline handlers
- Keep files small and focused — one module per concern
- No TypeScript — plain JavaScript for simplicity

## Project Structure

- `src/app.js` — Express app configuration and middleware
- `src/index.js` — Server entry point (listens on PORT)
- `src/routes/tasks.js` — CRUD route handlers for `/api/tasks`
- `src/store/taskStore.js` — In-memory data store with CRUD functions
- `src/middleware/errorHandler.js` — Global error handling middleware

## Testing

- Use **Vitest** as the test runner (`npm test`)
- Use **Supertest** for HTTP endpoint testing against the Express app
- Import the `app` from `src/app.js` (not `src/index.js`) for tests
- Tests should be self-contained — don't depend on external state

## When Adding Features

- Follow the existing patterns in `src/routes/` and `src/store/`
- Validate input in route handlers, not in the store
- Return appropriate HTTP status codes (201 for creation, 204 for deletion, 400 for bad input, 404 for not found)
- Keep the in-memory store — don't add a database
