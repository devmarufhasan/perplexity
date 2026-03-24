import { apiClient } from "../../../lib/api/api-client";
import { normalizeApiError } from "../../../lib/api/api-error";

const AUTH_API_BASE_URL = "/api/v1/auth";

export async function register({ username, email, password }) {
  try {
    const response = await apiClient.post(`${AUTH_API_BASE_URL}/register`, {
      username,
      email,
      password,
    });

    return {
      success: response.data?.success ?? true,
      message: response.data?.message || "User registered successfully",
      data: response.data?.data ?? null,
    };
  } catch (error) {
    throw normalizeApiError(error);
  }
}

export async function login({ email, password }) {
  try {
    const response = await apiClient.post(`${AUTH_API_BASE_URL}/login`, {
      email,
      password,
    });

    return {
      success: response.data?.success ?? true,
      message: response.data?.message || "Login successful",
      data: response.data?.data ?? null,
    };
  } catch (error) {
    throw normalizeApiError(error);
  }
}

export async function getMe() {
  try {
    const response = await apiClient.get(`${AUTH_API_BASE_URL}/get-me`);

    return {
      success: response.data?.success ?? true,
      message: response.data?.message || "User data retrieved successfully",
      data: response.data?.data ?? null,
    };
  } catch (error) {
    throw normalizeApiError(error);
  }
}
