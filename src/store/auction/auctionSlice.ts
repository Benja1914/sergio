import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Auction, AuctionState } from "./interfaces";

interface ExtendedAuctionState extends AuctionState {
  filter: string;
  filteredAuctions: Auction[];
}

const initialState: ExtendedAuctionState = {
  auctions: [],
  filteredAuctions: [],
  isLoading: false,
  filter: "",
  error: null,
};

export const auctionSlice = createSlice({
  name: "auction",
  initialState,
  reducers: {
    getAuctions: (state, action: PayloadAction<Auction[]>) => {
      state.auctions = action.payload;
      state.filteredAuctions = action.payload;
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
    deleteAuction: (state, action: PayloadAction<string>) => {
      state.auctions = state.auctions.filter(auction => auction.id !== action.payload);
      state.filteredAuctions = state.filteredAuctions.filter(auction => auction.id !== action.payload);
    },
    createAuction: (state, action: PayloadAction<Auction>) => {
      state.auctions = [action.payload, ...state.auctions];
      state.filteredAuctions = [action.payload, ...state.filteredAuctions];
    },
    filterAuctionsByTitle: (state, action: PayloadAction<string>) => {
      state.filter = action.payload;
      state.filteredAuctions = state.auctions.filter(auction =>
        auction.title.toLowerCase().includes(action.payload.toLowerCase())
      );
    },
    filterAuctionsByStatus: (state, action: PayloadAction<string>) => {
      if (action.payload === "") {
        state.filteredAuctions = state.auctions;
      } else {
        state.filteredAuctions = state.auctions.filter(auction =>
          auction.auctionStatus === action.payload
        );
      }
    },
    filterAuctionsByArtStyle: (state, action: PayloadAction<string>) => {
      if (action.payload === "") {
        state.filteredAuctions = state.auctions;
      } else {
        state.filteredAuctions = state.auctions.filter(auction =>
          auction.artStyle === action.payload
        );
      }
    },
  },
});

export const {
  getAuctions,
  startLoading,
  stopLoading,
  setError,
  clearError,
  deleteAuction,
  createAuction,
  filterAuctionsByTitle,
  filterAuctionsByStatus,
  filterAuctionsByArtStyle,
} = auctionSlice.actions;

export default auctionSlice.reducer;