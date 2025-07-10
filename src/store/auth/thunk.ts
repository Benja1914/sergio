import { AuthService, LoginRequest, SignupRequest } from "@/services/auth.service";
import { AppDispatch } from "../store";
import { startLoading, loginSuccess, setError, logoutSuccess, initializeAuth } from "./authSlice";

const authService = new AuthService();

export const loginUser = (credentials: LoginRequest) => {
  return async (dispatch: AppDispatch) => {
    dispatch(startLoading());
    try {
      const response = await authService.login(credentials);
      dispatch(loginSuccess(response));
    } catch (error: any) {
      dispatch(setError(error.message || 'Login failed'));
    }
  };
};

export const logoutUser = () => {
  return async (dispatch: AppDispatch) => {
    dispatch(startLoading());
    try {
      await authService.logout();
      dispatch(logoutSuccess());
    } catch (error: any) {
      dispatch(setError(error.message || 'Logout failed'));
      // Even if logout fails, clear credentials locally
      dispatch(logoutSuccess());
    }
  };
};

export const initializeAuthFromCookies = () => {
  return async (dispatch: AppDispatch) => {
    const token = authService.getToken();
    const user = authService.getUser();
    
    if (token && user) {
      dispatch(initializeAuth({ token, user }));
    } else {
      dispatch(initializeAuth(null));
    }
  };
};