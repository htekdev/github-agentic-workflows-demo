import { Router } from "express";
import {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
} from "../store/taskStore.js";

const router = Router();
const VALID_STATUSES = ["pending", "in-progress", "done"];

// GET /api/tasks
router.get("/", (_req, res) => {
  let tasks = getAllTasks();

  const { status } = _req.query;
  if (status) {
    if (!VALID_STATUSES.includes(status)) {
      return res.status(400).json({
        error: `Invalid status filter. Must be one of: ${VALID_STATUSES.join(", ")}`,
      });
    }
    tasks = tasks.filter((t) => t.status === status);
  }

  res.json(tasks);
});

// GET /api/tasks/:id
router.get("/:id", (req, res) => {
  const task = getTaskById(req.params.id);
  if (!task) {
    return res.status(404).json({ error: "Task not found" });
  }
  res.json(task);
});

// POST /api/tasks
router.post("/", (req, res) => {
  const { title, description, status } = req.body;

  if (!title || typeof title !== "string" || title.trim() === "") {
    return res.status(400).json({ error: "Title is required" });
  }

  if (status && !VALID_STATUSES.includes(status)) {
    return res.status(400).json({
      error: `Invalid status. Must be one of: ${VALID_STATUSES.join(", ")}`,
    });
  }

  const task = createTask({ title: title.trim(), description, status });
  res.status(201).json(task);
});

// PUT /api/tasks/:id
router.put("/:id", (req, res) => {
  const { title, description, status } = req.body;

  if (title === undefined && description === undefined && status === undefined) {
    return res.status(400).json({ error: "At least one field is required" });
  }

  if (status && !VALID_STATUSES.includes(status)) {
    return res.status(400).json({
      error: `Invalid status. Must be one of: ${VALID_STATUSES.join(", ")}`,
    });
  }

  const updates = {};
  if (title !== undefined) updates.title = title;
  if (description !== undefined) updates.description = description;
  if (status !== undefined) updates.status = status;

  const task = updateTask(req.params.id, updates);
  if (!task) {
    return res.status(404).json({ error: "Task not found" });
  }

  res.json(task);
});

// DELETE /api/tasks/:id
router.delete("/:id", (req, res) => {
  const deleted = deleteTask(req.params.id);
  if (!deleted) {
    return res.status(404).json({ error: "Task not found" });
  }
  res.status(204).end();
});

export default router;
