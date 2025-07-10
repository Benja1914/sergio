import { configureStore } from "@reduxjs/toolkit";
import { auctionSlice } from "./auction/auctionSlice";
import authSlice from "./auth/authSlice";
import profileSlice from "./profile/profileSlice";

export const store = configureStore({
  reducer: {
    auction: auctionSlice.reducer,
    auth: authSlice,
    profile: profileSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;