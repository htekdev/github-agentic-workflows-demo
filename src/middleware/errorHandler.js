export function errorHandler(err, _req, res, _next) {
  console.error(err);
  const status = err.status || err.statusCode || 500;
  if (status >= 400 && status < 500) {
    const message = err.expose ? err.message : "Bad request";
    return res.status(status).json({ error: message });
  }
  res.status(500).json({ error: "Internal server error" });
}
