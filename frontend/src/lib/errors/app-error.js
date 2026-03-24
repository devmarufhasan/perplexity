const DEFAULT_ERROR_MESSAGE = "Something went wrong. Please try again.";

export class AppError extends Error {
  constructor(message = DEFAULT_ERROR_MESSAGE, options = {}) {
    super(message);

    this.name = "AppError";
    this.success = false;
    this.code = options.code || "APP_ERROR";
    this.statusCode = options.statusCode ?? 500;
    this.details = Array.isArray(options.details) ? options.details : [];
    this.fieldErrors = options.fieldErrors || {};
    this.isNetworkError = options.isNetworkError ?? false;
    this.cause = options.cause;
  }
}

export function createAppError(message, options = {}) {
  return new AppError(message, options);
}

export function isAppError(error) {
  return error instanceof AppError;
}

export function normalizeError(error) {
  if (isAppError(error)) {
    return error;
  }

  if (error instanceof Error) {
    return new AppError(error.message || DEFAULT_ERROR_MESSAGE, {
      code: "UNEXPECTED_CLIENT_ERROR",
      statusCode: 500,
      cause: error,
    });
  }

  return new AppError(DEFAULT_ERROR_MESSAGE, {
    code: "UNEXPECTED_CLIENT_ERROR",
    statusCode: 500,
    cause: error,
  });
}
