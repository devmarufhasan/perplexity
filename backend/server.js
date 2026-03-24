import http from "node:http";

import app from "./src/app.js";
import { connectDatabase } from "./src/config/db.js";
import env from "./src/config/env.js";
import { testAi } from "./src/services/ai.service.js";

testAi();

async function startServer() {
  try {
    const dbConnection = await connectDatabase();

    const server = http.createServer(app);

    server.listen(env.port, () => {
      console.log(`Database connected: ${dbConnection.name}`);
      console.log(`Server listening on port ${env.port}`);
    });

    const shutdown = (signal) => {
      console.log(`${signal} received. Shutting down gracefully...`);

      server.close(async () => {
        await dbConnection.close();
        process.exit(0);
      });
    };

    process.on("SIGINT", () => shutdown("SIGINT"));
    process.on("SIGTERM", () => shutdown("SIGTERM"));
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

startServer();
