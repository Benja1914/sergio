import { createAsyncThunk } from "@reduxjs/toolkit";
import { ProfileApiResponse } from "./interfaces";
import { ProfileService } from "@/services/profile.service";

export const fetchUserProfile = createAsyncThunk<
  ProfileApiResponse,
  string,
  { rejectValue: string }
>(
  "profile/fetchUserProfile",
  async (userId: string, { rejectWithValue }) => {
    try {
      const data = await ProfileService.getUserProfile(userId);
      return data;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "An unexpected error occurred"
      );
    }
  }
);