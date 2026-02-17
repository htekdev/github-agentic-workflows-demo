import express from "express";
import cors from "cors";
import taskRoutes from "./routes/tasks.js";
import { errorHandler } from "./middleware/errorHandler.js";

const app = express();

app.use(cors());
app.use(express.json());

// Health check
app.get("/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// API routes
app.use("/api/tasks", taskRoutes);

// Error handler (must be last)
app.use(errorHandler);

export default app;
