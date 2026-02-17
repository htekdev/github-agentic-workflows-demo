import { describe, it, expect, beforeEach } from "vitest";
import request from "supertest";
import app from "../src/app.js";
import { resetStore } from "../src/store/taskStore.js";

beforeEach(() => {
  resetStore();
});

// ---------------------------------------------------------------------------
// Health check
// ---------------------------------------------------------------------------
describe("GET /health", () => {
  it("returns 200 with status ok and timestamp", async () => {
    const res = await request(app).get("/health");
    expect(res.status).toBe(200);
    expect(res.body.status).toBe("ok");
    expect(res.body.timestamp).toBeDefined();
    // timestamp should be a valid ISO string
    expect(new Date(res.body.timestamp).toISOString()).toBe(res.body.timestamp);
  });
});

// ---------------------------------------------------------------------------
// GET /api/tasks
// ---------------------------------------------------------------------------
describe("GET /api/tasks", () => {
  it("returns 200 with an array of tasks", async () => {
    const res = await request(app).get("/api/tasks");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBe(3); // 3 seeded tasks
  });

  it("filters tasks by status=pending", async () => {
    const res = await request(app).get("/api/tasks?status=pending");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
    for (const task of res.body) {
      expect(task.status).toBe("pending");
    }
  });

  it("returns 400 for an invalid status filter", async () => {
    const res = await request(app).get("/api/tasks?status=unknown");
    expect(res.status).toBe(400);
    expect(res.body.error).toBeDefined();
  });
});

// ---------------------------------------------------------------------------
// GET /api/tasks/:id
// ---------------------------------------------------------------------------
describe("GET /api/tasks/:id", () => {
  it("returns 200 with a task for a valid ID", async () => {
    // Grab an existing task ID from the seeded store
    const all = await request(app).get("/api/tasks");
    const taskId = all.body[0].id;

    const res = await request(app).get(`/api/tasks/${taskId}`);
    expect(res.status).toBe(200);
    expect(res.body.id).toBe(taskId);
    expect(res.body.title).toBeDefined();
  });

  it("returns 404 for a non-existent ID", async () => {
    const res = await request(app).get("/api/tasks/non-existent-id");
    expect(res.status).toBe(404);
    expect(res.body.error).toBe("Task not found");
  });
});

// ---------------------------------------------------------------------------
// POST /api/tasks
// ---------------------------------------------------------------------------
describe("POST /api/tasks", () => {
  it("creates a task with title only and returns 201 with defaults", async () => {
    const res = await request(app)
      .post("/api/tasks")
      .send({ title: "New task" });

    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.title).toBe("New task");
    expect(res.body.status).toBe("pending");
    expect(res.body.createdAt).toBeDefined();
    expect(res.body.updatedAt).toBeDefined();
  });

  it("creates a task with all fields", async () => {
    const res = await request(app).post("/api/tasks").send({
      title: "Full task",
      description: "A complete task",
      status: "in-progress",
    });

    expect(res.status).toBe(201);
    expect(res.body.title).toBe("Full task");
    expect(res.body.description).toBe("A complete task");
    expect(res.body.status).toBe("in-progress");
  });

  it("returns 400 when title is missing", async () => {
    const res = await request(app).post("/api/tasks").send({});
    expect(res.status).toBe(400);
    expect(res.body.error).toBeDefined();
  });

  it("returns 400 when status is invalid", async () => {
    const res = await request(app)
      .post("/api/tasks")
      .send({ title: "Bad status", status: "invalid" });

    expect(res.status).toBe(400);
    expect(res.body.error).toBeDefined();
  });
});

// ---------------------------------------------------------------------------
// PUT /api/tasks/:id
// ---------------------------------------------------------------------------
describe("PUT /api/tasks/:id", () => {
  let taskId;

  beforeEach(async () => {
    const res = await request(app)
      .post("/api/tasks")
      .send({ title: "Task to update" });
    taskId = res.body.id;
  });

  it("updates task title and returns 200", async () => {
    const res = await request(app)
      .put(`/api/tasks/${taskId}`)
      .send({ title: "Updated title" });

    expect(res.status).toBe(200);
    expect(res.body.title).toBe("Updated title");
    expect(res.body.id).toBe(taskId);
  });

  it("updates task status and returns 200", async () => {
    const res = await request(app)
      .put(`/api/tasks/${taskId}`)
      .send({ status: "done" });

    expect(res.status).toBe(200);
    expect(res.body.status).toBe("done");
  });

  it("returns 404 for a non-existent ID", async () => {
    const res = await request(app)
      .put("/api/tasks/non-existent-id")
      .send({ title: "Nope" });

    expect(res.status).toBe(404);
    expect(res.body.error).toBe("Task not found");
  });

  it("returns 400 when no fields are provided", async () => {
    const res = await request(app).put(`/api/tasks/${taskId}`).send({});
    expect(res.status).toBe(400);
    expect(res.body.error).toBeDefined();
  });

  it("returns 400 when status is invalid", async () => {
    const res = await request(app)
      .put(`/api/tasks/${taskId}`)
      .send({ status: "invalid" });

    expect(res.status).toBe(400);
    expect(res.body.error).toBeDefined();
  });
});

// ---------------------------------------------------------------------------
// DELETE /api/tasks/:id
// ---------------------------------------------------------------------------
describe("DELETE /api/tasks/:id", () => {
  let taskId;

  beforeEach(async () => {
    const res = await request(app)
      .post("/api/tasks")
      .send({ title: "Task to delete" });
    taskId = res.body.id;
  });

  it("deletes a task and returns 204", async () => {
    const res = await request(app).delete(`/api/tasks/${taskId}`);
    expect(res.status).toBe(204);

    // Verify it's actually gone
    const check = await request(app).get(`/api/tasks/${taskId}`);
    expect(check.status).toBe(404);
  });

  it("returns 404 for a non-existent ID", async () => {
    const res = await request(app).delete("/api/tasks/non-existent-id");
    expect(res.status).toBe(404);
    expect(res.body.error).toBe("Task not found");
  });
});
