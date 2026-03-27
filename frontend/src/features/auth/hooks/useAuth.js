import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { setError, setLoading, setUser } from "../auth.slice.js";
import { getMe, login, register } from "../services/auth.api";

export function useAuth() {
  const dispatch = useDispatch();

  const handleRegister = useCallback(async (username, email, password) => {
    dispatch(setLoading(true));
    try {
      const response = await register({ username, email, password });
      if (response.success) {
        dispatch(setError(null));
        console.log("Check email to verify");
      } else {
        dispatch(setError(response.message));
      }
    } catch (error) {
      dispatch(setError(error.message));
    } finally {
      dispatch(setLoading(false));
    }
  }, [dispatch]);

  const handleLogin = useCallback(async (email, password) => {
    dispatch(setLoading(true));
    try {
      const response = await login({ email, password });
      if (response.success) {
        dispatch(setError(null));
        dispatch(setUser(response.data.user));
        return response.data.user;
      } else {
        dispatch(setError(response.message));
        throw new Error(response.message);
      }
    } catch (error) {
      dispatch(setError(error.message));
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  }, [dispatch]);

  const handleGetMe = useCallback(async () => {
    dispatch(setLoading(true));
    try {
      const response = await getMe();
      if (response.success) {
        dispatch(setError(null));
        dispatch(setUser(response.data));
      } else {
        dispatch(setError(response.message));
      }
    } catch (error) {
      dispatch(setUser(null));
      dispatch(setError(error.message));
    } finally {
      dispatch(setLoading(false));
    }
  }, [dispatch]);

  return {
    handleRegister,
    handleLogin,
    handleGetMe,
  };
}
