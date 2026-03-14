import { matchedData, validationResult } from "express-validator";

import AppError from "../utils/app-error.js";

export function validateRequest(req, _res, next) {
  const result = validationResult(req);

  if (result.isEmpty()) {
    req.body = matchedData(req, {
      locations: ["body"],
      includeOptionals: true,
    });

    return next();
  }

  next(
    new AppError(
      "Validation failed",
      422,
      "REQUEST_VALIDATION_FAILED",
      result.array().map(({ msg, path, value }) => ({
        field: path,
        message: msg,
        value,
      })),
    ),
  );
}
