import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProfileState, ProfileData } from "./interfaces";

const initialState: ProfileState = {
  profileData: null,
  isLoading: false,
  error: null,
};

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    getProfile: (state, action: PayloadAction<ProfileData>) => {
      state.profileData = action.payload;
    },
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
    clearProfile: (state) => {
      state.profileData = null;
      state.error = null;
    },
  },
});

export const {
  getProfile,
  startLoading,
  stopLoading,
  setError,
  clearError,
  clearProfile,
} = profileSlice.actions;

export default profileSlice.reducer;