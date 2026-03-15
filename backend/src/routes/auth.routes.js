import { Router } from "express";

import * as authController from "../controllers/auth.controller.js";
import { validateRequest } from "../middlewares/validate-request.js";
import {
  loginValidator,
  registerValidator,
} from "../validators/auth.validator.js";

const authRouter = Router();

authRouter.post(
  "/register",
  registerValidator,
  validateRequest,
  authController.register,
);

authRouter.post("/login", loginValidator, validateRequest, authController.login);

authRouter.get("/verify-email/:token", authController.verifyEmail);

export default authRouter;
