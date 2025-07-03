import { configureStore } from "@reduxjs/toolkit";
import { auctionSlice } from "./auction/auctionSlice";

export const store = configureStore({
  reducer: {
    auction: auctionSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;