import { useDispatch } from "react-redux";
import { setError, setLoading, setUser } from "../auth.slice.js";
import { getMe, login, register } from "../services/auth.api";

export function useAuth() {
  const dispatch = useDispatch();

  async function handleRegister(username, email, password) {
    dispatch(setLoading(true));
    try {
      const response = await register({ username, email, password });
      if (response.success) {
        dispatch(setUser(response.data));
      } else {
        dispatch(setError(response.message));
      }
    } catch (error) {
      dispatch(setError(error.message));
    } finally {
      dispatch(setLoading(false));
    }
  }

  async function handleLogin(email, password) {
    dispatch(setLoading(true));
    try {
      const response = await login({ email, password });
      if (response.success) {
        dispatch(setUser(response.data));
      } else {
        dispatch(setError(response.message));
      }
    } catch (error) {
      dispatch(setError(error.message));
    } finally {
      dispatch(setLoading(false));
    }
  }

  async function handleGetMe() {
    dispatch(setLoading(true));
    try {
      const response = await getMe();
      if (response.success) {
        dispatch(setUser(response.data));
      } else {
        dispatch(setError(response.message));
      }
    } catch (error) {
      dispatch(setError(error.message));
    } finally {
      dispatch(setLoading(false));
    }
  }

  return {
    handleRegister,
    handleLogin,
    handleGetMe,
  };
}
