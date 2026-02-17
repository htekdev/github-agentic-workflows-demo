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

### Endpoints

| Method | Route | Description |
|--------|-------|-------------|
| `GET` | `/api/tasks` | List all tasks (optional `?status=` filter) |
| `GET` | `/api/tasks/:id` | Get a single task by ID |
| `POST` | `/api/tasks` | Create a new task |
| `PUT` | `/api/tasks/:id` | Update an existing task |
| `DELETE` | `/api/tasks/:id` | Delete a task |
| `GET` | `/health` | Health check |

### Task Schema

```json
{
  "id": "uuid",
  "title": "string",
  "description": "string",
  "status": "pending | in-progress | done",
  "createdAt": "ISO 8601 timestamp",
  "updatedAt": "ISO 8601 timestamp"
}
```

### Status Filter

Filter tasks by status with the query parameter:

```
GET /api/tasks?status=pending
GET /api/tasks?status=in-progress
GET /api/tasks?status=done
```

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
