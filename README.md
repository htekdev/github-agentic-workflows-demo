# GitHub Agentic Workflows Demo

![Node.js](https://img.shields.io/badge/Node.js-22-339933?logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-5-000000?logo=express&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/GitHub%20Actions-Agentic-2088FF?logo=github-actions&logoColor=white)
![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)

A **Task Tracker API** demonstrating [GitHub's Agentic Workflows](https://github.github.com/gh-aw/) — AI-powered automation written in natural language Markdown that lets GitHub Copilot act as an autonomous agent inside your CI/CD pipeline.

## What Are GitHub Agentic Workflows?

GitHub Agentic Workflows allow you to define CI/CD automation in plain Markdown instead of YAML. Copilot reads your natural language instructions and autonomously executes multi-step tasks — triaging issues, reviewing PRs, updating docs, and more — directly within GitHub Actions.

- 📖 [Official Documentation](https://github.github.com/gh-aw/)
- 📢 [Announcement (Technical Preview)](https://github.blog/changelog/2026-02-13-github-agentic-workflows-are-now-in-technical-preview/)

## Workflows in This Repo

| Workflow | Trigger | What It Does |
|----------|---------|--------------|
| **Issue Triage** | New issue opened | AI classifies, labels, and prioritizes issues |
| **PR Reviewer** | New pull request | AI reviews code changes and suggests improvements |
| **Docs Updater** | PR merged / manual | AI updates API documentation automatically |
| **Weekly Digest** | Weekly schedule | AI summarizes repo activity into a digest |

> 🚧 **Coming soon** — Agentic workflow files will be added as the project evolves.

## The API

This repo includes a simple Task Tracker REST API used as the codebase that the agentic workflows operate on.

### API Endpoints

#### Health Check
`GET /health`

Returns server health status.

**Response** (200):
````json
{
  "status": "ok",
  "timestamp": "2026-02-17T02:51:20.934Z"
}
````

---

#### List Tasks
`GET /api/tasks`

Query parameters:
- `status` (optional): Filter by status (`pending`, `in-progress`, `done`)

**Response** (200):
````json
[
  {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "title": "Build feature X",
    "description": "Implement the new dashboard feature",
    "status": "in-progress",
    "createdAt": "2026-02-17T02:00:00.000Z",
    "updatedAt": "2026-02-17T02:30:00.000Z"
  }
]
````

**Response** (400) - Invalid status filter:
````json
{
  "error": "Invalid status filter. Must be one of: pending, in-progress, done"
}
````

---

#### Get Task by ID
`GET /api/tasks/:id`

**Response** (200):
````json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "title": "Build feature X",
  "description": "Implement the new dashboard feature",
  "status": "in-progress",
  "createdAt": "2026-02-17T02:00:00.000Z",
  "updatedAt": "2026-02-17T02:30:00.000Z"
}
````

**Response** (404) - Task not found:
````json
{
  "error": "Task not found"
}
````

---

#### Create Task
`POST /api/tasks`

**Request body**:
````json
{
  "title": "Build feature X",
  "description": "Implement the new dashboard feature",
  "status": "pending"
}
````

- `title` (required): Task title (non-empty string)
- `description` (optional): Task description
- `status` (optional): Task status (`pending`, `in-progress`, `done`). Defaults to `pending`

**Response** (201):
````json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "title": "Build feature X",
  "description": "Implement the new dashboard feature",
  "status": "pending",
  "createdAt": "2026-02-17T02:00:00.000Z",
  "updatedAt": "2026-02-17T02:00:00.000Z"
}
````

**Response** (400) - Missing or invalid title:
````json
{
  "error": "Title is required"
}
````

**Response** (400) - Invalid status:
````json
{
  "error": "Invalid status. Must be one of: pending, in-progress, done"
}
````

---

#### Update Task
`PUT /api/tasks/:id`

**Request body**:
````json
{
  "title": "Build feature X (updated)",
  "description": "Implement the new dashboard feature with tests",
  "status": "done"
}
````

All fields are optional, but at least one must be provided:
- `title` (optional): New task title
- `description` (optional): New task description
- `status` (optional): New task status (`pending`, `in-progress`, `done`)

**Response** (200):
````json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "title": "Build feature X (updated)",
  "description": "Implement the new dashboard feature with tests",
  "status": "done",
  "createdAt": "2026-02-17T02:00:00.000Z",
  "updatedAt": "2026-02-17T02:45:00.000Z"
}
````

**Response** (400) - No fields provided:
````json
{
  "error": "At least one field is required"
}
````

**Response** (400) - Invalid status:
````json
{
  "error": "Invalid status. Must be one of: pending, in-progress, done"
}
````

**Response** (404) - Task not found:
````json
{
  "error": "Task not found"
}
````

---

#### Delete Task
`DELETE /api/tasks/:id`

**Response** (204) - No content on success

**Response** (404) - Task not found:
````json
{
  "error": "Task not found"
}
````

## Getting Started

```bash
git clone https://github.com/htekdev/github-agentic-workflows-demo.git
cd github-agentic-workflows-demo
npm install
npm run dev
```

The API starts on `http://localhost:3000` by default. Set the `PORT` environment variable to change it.

## Running Tests

```bash
npm test
```

Tests use [Vitest](https://vitest.dev/) with [Supertest](https://github.com/ladjs/supertest) for HTTP assertions.

## Project Structure

```
github-agentic-workflows-demo/
├── .github/
│   └── copilot-instructions.md
├── src/
│   ├── app.js                  # Express app setup
│   ├── index.js                # Server entry point
│   ├── middleware/
│   │   └── errorHandler.js     # Global error handler
│   ├── routes/
│   │   └── tasks.js            # Task CRUD routes
│   └── store/
│       └── taskStore.js        # In-memory task store
├── .gitignore
├── .nvmrc
├── CONTRIBUTING.md
├── LICENSE
├── package.json
└── README.md
```

## License

[MIT](LICENSE) © 2026 Hector Flores

## Author

Built by [@htekdev](https://github.com/htekdev) — companion repo for the article on [htek.dev](https://htek.dev).
