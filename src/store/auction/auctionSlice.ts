import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Auction, AuctionState } from "./interfaces";

interface ExtendedAuctionState extends AuctionState {
  filter: string;
  filteredAuctions: Auction[];
  userAuctions: Auction[]; // Nueva propiedad para auctions del usuario actual
}

const initialState: ExtendedAuctionState = {
  auctions: [],
  filteredAuctions: [],
  userAuctions: [], // Inicializar el nuevo estado
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
    // Nueva acción para auctions de usuario específico
    getUserAuctions: (state, action: PayloadAction<Auction[]>) => {
      state.userAuctions = action.payload;
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
      state.userAuctions = state.userAuctions.filter(auction => auction.id !== action.payload);
    },
    createAuction: (state, action: PayloadAction<Auction>) => {
      state.auctions = [action.payload, ...state.auctions];
      state.filteredAuctions = [action.payload, ...state.filteredAuctions];
      // Si la auction creada pertenece al usuario actual, agregarla también a userAuctions
      state.userAuctions = [action.payload, ...state.userAuctions];
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
  getUserAuctions, // Exportar la nueva acción
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