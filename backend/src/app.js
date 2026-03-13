import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import apiV1Router from "./routes/index.js";
import { notFoundMiddleware } from "./middlewares/not-found.js";
import { globalErrorMiddleware } from "./middlewares/error-handler.js";

const app = express();

app.disable("x-powered-by");
app.set("trust proxy", 1);

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/health", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is healthy",
    timestamp: new Date().toISOString(),
  });
});

app.use("/api/v1", apiV1Router);

app.use(notFoundMiddleware);
app.use(globalErrorMiddleware);

export default app;
