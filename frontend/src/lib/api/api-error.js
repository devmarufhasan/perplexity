import axios from "axios";
import { AppError } from "../errors/app-error";

const DEFAULT_ERROR_MESSAGE = "Something went wrong. Please try again.";

function mapFieldErrors(details = []) {
  return details.reduce((fieldErrors, detail) => {
    if (!detail?.field || !detail?.message) {
      return fieldErrors;
    }

    fieldErrors[detail.field] = detail.message;

    return fieldErrors;
  }, {});
}

export function normalizeApiError(error) {
  if (!axios.isAxiosError(error)) {
    return new AppError(DEFAULT_ERROR_MESSAGE, {
      code: "UNEXPECTED_CLIENT_ERROR",
      statusCode: 500,
      cause: error,
    });
  }

  if (!error.response) {
    return new AppError(
      "Unable to reach the server. Please check your connection.",
      {
        code: "NETWORK_ERROR",
        statusCode: 0,
        isNetworkError: true,
        cause: error,
      },
    );
  }

  const { status, data } = error.response;
  const details = Array.isArray(data?.error?.details) ? data.error.details : [];

  return new AppError(data?.message || DEFAULT_ERROR_MESSAGE, {
    statusCode: status,
    code: data?.error?.code || "REQUEST_FAILED",
    details,
    fieldErrors: mapFieldErrors(details),
    cause: error,
  });
}
