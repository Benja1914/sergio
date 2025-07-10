import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthState, LoginApiResponse, User } from "./interfaces";

const initialState: AuthState = {
  user: null,
  accessToken: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  loginResponse: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    startLoading: (state) => {
      state.isLoading = true;
    },
    stopLoading: (state) => {
      state.isLoading = false;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    clearError: (state) => {
      state.error = null;
    },
    loginSuccess: (state, action: PayloadAction<LoginApiResponse>) => {
      state.isLoading = false;
      state.loginResponse = action.payload;
      
      // Extraer user y accessToken de la respuesta
      const { accessToken, ...userData } = action.payload.data;
      state.user = userData;
      state.accessToken = accessToken;
      state.isAuthenticated = true;
      state.error = null;
    },
    logoutSuccess: (state) => {
      state.isLoading = false;
      state.user = null;
      state.accessToken = null;
      state.isAuthenticated = false;
      state.loginResponse = null;
    },
    initializeAuth: (state, action: PayloadAction<{user: User; token: string} | null>) => {
      if (action.payload) {
        state.user = action.payload.user;
        state.accessToken = action.payload.token;
        state.isAuthenticated = true;
      }
    },
    clearCredentials: (state) => {
      state.user = null;
      state.accessToken = null;
      state.isAuthenticated = false;
      state.loginResponse = null;
    },
  },
});

export const {
  startLoading,
  stopLoading,
  setError,
  clearError,
  loginSuccess,
  logoutSuccess,
  initializeAuth,
  clearCredentials,
} = authSlice.actions;

export default authSlice.reducer;