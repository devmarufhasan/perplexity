import mongoose from "mongoose";

import env from "./env.js";

function wait(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

export async function connectDatabase() {
  mongoose.set("strictQuery", true);

  for (let attempt = 1; attempt <= env.dbMaxRetries; attempt += 1) {
    try {
      await mongoose.connect(env.mongodbUri, {
        serverSelectionTimeoutMS: env.dbServerSelectionTimeoutMs,
      });

      return mongoose.connection;
    } catch (error) {
      const isLastAttempt = attempt === env.dbMaxRetries;

      console.error(
        `Database connection attempt ${attempt}/${env.dbMaxRetries} failed: ${error.message}`
      );

      if (isLastAttempt) {
        throw error;
      }

      await wait(env.dbRetryDelayMs);
    }
  }

  throw new Error("Database connection retries exhausted");
}
