import path from "node:path";
import { fileURLToPath } from "node:url";

import dotenv from "dotenv";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({
  path: path.resolve(__dirname, "../../.env"),
});

const requiredEnvVars = ["MONGODB_URI", "JWT_SECRET"];

for (const key of requiredEnvVars) {
  if (!process.env[key]) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
}

const env = {
  nodeEnv: process.env.NODE_ENV || "development",
  port: Number(process.env.PORT) || 3000,
  mongodbUri: process.env.MONGODB_URI,
  jwtSecret: process.env.JWT_SECRET,

  dbMaxRetries: Number(process.env.DB_MAX_RETRIES) || 10,
  dbRetryDelayMs: Number(process.env.DB_RETRY_DELAY_MS) || 5000,
  dbServerSelectionTimeoutMs:
    Number(process.env.DB_SERVER_SELECTION_TIMEOUT_MS) || 5000,

  googleClientId: process.env.GOOGLE_CLIENT_ID,
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
  googleRefreshToken: process.env.GOOGLE_REFRESH_TOKEN,
  googleUser: process.env.GOOGLE_USER,
  geminiApiKey: process.env.GEMINI_API_KEY,

  mistralApiKey: process.env.MISTRAL_API_KEY,

  valkeyUrl: process.env.VALKEY_URL || "redis://127.0.0.1:6379",
  valkeyEnabled: process.env.VALKEY_ENABLED !== "false",
  valkeyTtlSeconds: Number(process.env.VALKEY_TTL_SECONDS) || 3600,
  chatHistoryLimit: Number(process.env.CHAT_HISTORY_LIMIT) || 20,
};

export default env;
