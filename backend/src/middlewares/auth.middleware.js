import jwt from "jsonwebtoken";
import env from "../config/env.js";
import AppError from "../utils/app-error.js";

export function authUser(req, res, next) {
  const token = req.cookies.token;
  if (!token) {
    throw new AppError("Unauthorized", 401, "UNAUTHORIZED");
  }

  const decoded = jwt.verify(token, env.jwtSecret);
  req.user = {
    id: decoded.userId,
    email: decoded.email,
  };
  next();
}
