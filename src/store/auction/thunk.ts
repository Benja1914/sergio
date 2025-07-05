import { createAsyncThunk } from "@reduxjs/toolkit";
import { Auction } from "./interfaces";
import { AuctionService } from "@/services/auction.service";

export interface FetchAuctionsParams {
  category?: string;
  status?: "open" | "closed" | "pending";
  page?: number;
  limit?: number;
  artStyle?: "anime" | "realistic" | "cartoon" | "abstract";
  search?: string;
  filters?: {
    safetyLevel?: string[];
    species?: string[];
    deliveryDueDays?: number[];
  };
}

// Usar createAsyncThunk en lugar de thunk manual
export const fetchAuctions = createAsyncThunk(
  'auction/fetchAuctions',
  async (params?: FetchAuctionsParams) => {
    const auctionService = new AuctionService();
    const auctions = await auctionService.getAuctions(params);
    return auctions;
  }
);

export const removeAuction = createAsyncThunk(
  'auction/removeAuction',
  async (id: string, { dispatch }) => {
    const auctionService = new AuctionService();
    await auctionService.deleteAuction(id);
    // Refetch auctions after deletion
    dispatch(fetchAuctions());
    return id;
  }
);

export const createNewAuction = createAsyncThunk(
  'auction/createNewAuction',
  async (auction: Partial<Auction>, { dispatch }) => {
    const auctionService = new AuctionService();
    const newAuction = await auctionService.createAuction(auction);
    // Refetch auctions after creation
    dispatch(fetchAuctions());
    return newAuction;
  }
);