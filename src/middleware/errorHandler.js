export function errorHandler(err, _req, res, _next) {
  console.error(err);
  res.status(500).json({ error: "Internal server error" });
}
