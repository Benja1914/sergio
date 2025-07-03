import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Auction, AuctionState } from "./interfaces";
import { createNewAuction, fetchAuctions, removeAuction } from "./thunk";

const initialState: AuctionState & { filter: string; filteredAuctions: Auction[]; error: string | null } = {
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
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch Auctions
    builder
      .addCase(fetchAuctions.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAuctions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.auctions = action.payload;
        state.filteredAuctions = action.payload;
      })
      .addCase(fetchAuctions.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Error fetching auctions';
      })
    // Remove Auction
      .addCase(removeAuction.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(removeAuction.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(removeAuction.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Error removing auction';
      })
    // Create Auction
      .addCase(createNewAuction.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createNewAuction.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(createNewAuction.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Error creating auction';
      });
  },
});

export const {
  filterAuctionsByTitle,
  filterAuctionsByStatus,
  filterAuctionsByArtStyle,
  clearError,
} = auctionSlice.actions;

export default auctionSlice.reducer;