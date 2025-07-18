import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PublicationsState, Publication } from "./interfaces";

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
    addPublication: (state, action: PayloadAction<{userId: string; publication: Publication}>) => {
      const { userId, publication } = action.payload;
      if (state.userPublications[userId]) {
        state.userPublications[userId].unshift(publication);
      }
      state.publications.unshift(publication);
    },
    updatePublication: (state, action: PayloadAction<Publication>) => {
      const updatedPublication = action.payload;
      
      // Update in publications array
      const publicationIndex = state.publications.findIndex(p => p.id === updatedPublication.id);
      if (publicationIndex !== -1) {
        state.publications[publicationIndex] = updatedPublication;
      }
      
      // Update in userPublications
      Object.keys(state.userPublications).forEach(userId => {
        const userPublicationIndex = state.userPublications[userId].findIndex(p => p.id === updatedPublication.id);
        if (userPublicationIndex !== -1) {
          state.userPublications[userId][userPublicationIndex] = updatedPublication;
        }
      });
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
  updatePublication,
} = publicationsSlice.actions;

export default publicationsSlice.reducer;