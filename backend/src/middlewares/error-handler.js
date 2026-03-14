import env from "../config/env.js";
import AppError from "../utils/app-error.js";

function buildValidationDetails(validationError) {
  return Object.values(validationError.errors).map((error) => ({
    field: error.path,
    message: error.message,
    value: error.value,
  }));
}

function buildDuplicateKeyDetails(error) {
  return Object.entries(error.keyValue || {}).map(([field, value]) => ({
    field,
    message: `${field} already exists`,
    value,
  }));
}

function normalizeError(error) {
  if (error instanceof AppError) {
    return error;
  }

  if (error?.name === "ValidationError") {
    return new AppError(
      "Validation failed",
      422,
      "REQUEST_VALIDATION_FAILED",
      buildValidationDetails(error),
    );
  }

  if (error?.name === "CastError") {
    return new AppError("Invalid request data", 400, "INVALID_REQUEST_DATA", [
      {
        field: error.path,
        message: `Invalid value for ${error.path}`,
        value: error.value,
      },
    ]);
  }

  if (error?.name === "MongoServerError" && error?.code === 11000) {
    return new AppError(
      "Resource already exists",
      409,
      "RESOURCE_ALREADY_EXISTS",
      buildDuplicateKeyDetails(error),
    );
  }

  if (error?.name === "JsonWebTokenError") {
    return new AppError(
      "Invalid authentication token",
      401,
      "INVALID_AUTH_TOKEN",
    );
  }

  if (error?.name === "TokenExpiredError") {
    return new AppError(
      "Authentication token expired",
      401,
      "AUTH_TOKEN_EXPIRED",
    );
  }

  const internalError = new AppError(
    "Internal server error",
    500,
    "INTERNAL_SERVER_ERROR",
  );
  internalError.isOperational = false;

  return internalError;
}

export function globalErrorMiddleware(err, _req, res, _next) {
  const error = normalizeError(err);
  const isServerError = error.statusCode >= 500;

  if (isServerError) {
    console.error("Unhandled error:", err);
  }

  const payload = {
    success: false,
    message: isServerError ? "Internal server error" : error.message,
    error: {
      code: error.code,
    },
  };

  if (Array.isArray(error.details) && error.details.length > 0) {
    payload.error.details = error.details;
  }

  if (env.nodeEnv !== "production" && !error.isOperational) {
    payload.error.debug = {
      message: err.message,
      stack: err.stack,
    };
  }

  res.status(error.statusCode).json(payload);
}
