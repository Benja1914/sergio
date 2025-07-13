import { Auction } from "./interfaces";
import { AuctionService } from "@/services/auction.service";
import { AppDispatch } from "../store";
import { startLoading, getAuctions, getUserAuctions, setError, deleteAuction, createAuction, stopLoading } from "./auctionSlice";

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

// Nueva acción para obtener auctions de un usuario específico
export const fetchUserAuctions = (userId: string, params?: Omit<FetchAuctionsParams, 'search'>) => {
  return async (dispatch: AppDispatch) => {
    dispatch(startLoading());
    try {
      const auctionService = new AuctionService();
      const userAuctions = await auctionService.getUserAuctions(userId, params);
      dispatch(stopLoading());
      // Usar getUserAuctions en lugar de getAuctions para mantener separado el estado
      dispatch(getUserAuctions(userAuctions));
    } catch (error: any) {
      dispatch(setError(error.message || 'Error fetching user auctions'));
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