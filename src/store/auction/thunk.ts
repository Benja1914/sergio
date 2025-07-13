import { Auction } from "./interfaces";
import { AuctionService } from "@/services/auction.service";
import { AppDispatch } from "../store";
import { startLoading, getAuctions, setError, deleteAuction, createAuction, stopLoading } from "./auctionSlice";

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

export const fetchAuctions = (params?: FetchAuctionsParams) => {
  return async (dispatch: AppDispatch) => {
    dispatch(startLoading());
    try {
      const auctionService = new AuctionService();
      const auctions = await auctionService.getAuctions(params);
      dispatch(stopLoading());
      dispatch(getAuctions(auctions));
    } catch (error: any) {
      dispatch(setError(error.message || 'Error fetching auctions'));
    }
  };
};

export const removeAuction = (id: string) => {
  return async (dispatch: AppDispatch) => {
    dispatch(startLoading());
    try {
      const auctionService = new AuctionService();
      await auctionService.deleteAuction(id);
      dispatch(deleteAuction(id));
      dispatch(stopLoading());
    } catch (error: any) {
      dispatch(setError(error.message || 'Error removing auction'));
    }
  };
};

export const createNewAuction = (auction: Partial<Auction>) => {
  return async (dispatch: AppDispatch) => {
    dispatch(startLoading());
    try {
      const auctionService = new AuctionService();
      const newAuction = await auctionService.createAuction(auction);
      dispatch(createAuction(newAuction));
      dispatch(stopLoading());
    } catch (error: any) {
      dispatch(setError(error.message || 'Error creating auction'));
    }
  };
};