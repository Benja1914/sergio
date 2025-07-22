import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PublicationsState, Publication } from "./interfaces";
import { CreatePublicationRequest } from "@/interfaces/puiblications";

const initialState: PublicationsState = {
  publications: [],
  userPublications: {},
  isLoading: false,
  error: null,
};

export const publicationsSlice = createSlice({
  name: "publications",
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
    setUserPublications: (state, action: PayloadAction<{userId: string; publications: Publication[]}>) => {
      state.userPublications[action.payload.userId] = action.payload.publications;
      state.isLoading = false;
      state.error = null;
    },
    setAllPublications: (state, action: PayloadAction<Publication[]>) => {
      state.publications = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    addPublication: (state, action: PayloadAction<CreatePublicationRequest>) => {
      state.publications.unshift(action.payload);
    },
  },
});

export const {
  startLoading,
  stopLoading,
  setError,
  clearError,
  setUserPublications,
  setAllPublications,
  addPublication,
} = publicationsSlice.actions;

export default publicationsSlice.reducer;