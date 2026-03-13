export function getApiStatus(_req, res) {
  res.status(200).json({
    success: true,
    message: "API v1 is running",
    version: "v1",
    timestamp: new Date().toISOString(),
  });
}
