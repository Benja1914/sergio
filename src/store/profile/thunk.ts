import { createAsyncThunk } from "@reduxjs/toolkit";
import { ProfileApiResponse } from "./interfaces";
import { ProfileService } from "@/services/profile.service";
import { getProfile, setError, startLoading, stopLoading } from "./profileSlice"; // Asegúrate de importar la acción





export const fetchUserProfile = (userId: string) => {
  return async (dispatch: any) => {

    try {
      dispatch(startLoading());
      const data = await ProfileService.getUserProfile(userId);
      dispatch(getProfile(data.data));
      dispatch(stopLoading())
    } catch (error: any) {
      dispatch(setError(error.message || 'Login failed'));
    }
  }
}
