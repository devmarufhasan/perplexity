import http from "node:http";

import app from "./src/app.js";
import { connectDatabase } from "./src/config/db.js";
import env from "./src/config/env.js";
import { connectValkey, disconnectValkey } from "./src/config/valkey.js";
import { initializeSocket } from "./src/sockets/server.socket.js";

async function startServer() {
  try {
    const dbConnection = await connectDatabase();
    await connectValkey();

    const server = http.createServer(app);
    initializeSocket(server);

    server.listen(env.port, () => {
      console.log(`Database connected: ${dbConnection.name}`);
      console.log(`Server listening on port ${env.port}`);
    });

    const shutdown = (signal) => {
      console.log(`${signal} received. Shutting down gracefully...`);

      server.close(async () => {
        await disconnectValkey();
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
