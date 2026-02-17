import crypto from "node:crypto";

const tasks = new Map();

// Seed with sample tasks
const seedTasks = [
  {
    title: "Set up project repository",
    description: "Initialize the repo with README and base config",
    status: "done",
  },
  {
    title: "Implement API endpoints",
    description: "Build CRUD routes for task management",
    status: "in-progress",
  },
  {
    title: "Write integration tests",
    description: "Add test coverage for all API endpoints",
    status: "pending",
  },
];

for (const data of seedTasks) {
  const id = crypto.randomUUID();
  const now = new Date().toISOString();
  tasks.set(id, {
    id,
    title: data.title,
    description: data.description,
    status: data.status,
    createdAt: now,
    updatedAt: now,
  });
}

export function getAllTasks() {
  return [...tasks.values()];
}

export function getTaskById(id) {
  return tasks.get(id) || null;
}

export function createTask(data) {
  const id = crypto.randomUUID();
  const now = new Date().toISOString();
  const task = {
    id,
    title: data.title,
    description: data.description || "",
    status: data.status || "pending",
    createdAt: now,
    updatedAt: now,
  };
  tasks.set(id, task);
  return task;
}

export function updateTask(id, data) {
  const task = tasks.get(id);
  if (!task) return null;

  const updated = {
    ...task,
    ...data,
    id: task.id,
    createdAt: task.createdAt,
    updatedAt: new Date().toISOString(),
  };
  tasks.set(id, updated);
  return updated;
}

export function deleteTask(id) {
  const task = tasks.get(id);
  if (!task) return false;
  tasks.delete(id);
  return true;
}

export function resetStore() {
  tasks.clear();
  for (const data of seedTasks) {
    const id = crypto.randomUUID();
    const now = new Date().toISOString();
    tasks.set(id, {
      id,
      title: data.title,
      description: data.description,
      status: data.status,
      createdAt: now,
      updatedAt: now,
    });
  }
}
