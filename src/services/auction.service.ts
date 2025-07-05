import { ApiUtils } from "@/utils/api.utils";
import { Auction, AuctionResponse } from "@/store/auction/interfaces";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api/v1";

export interface GetAuctionsParams {
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

export class AuctionService {
  async getAuctions(params?: GetAuctionsParams): Promise<Auction[]> {
    const url = `${API_URL}/auctions`;
    
    // Construir query parameters
    const queryParams = new URLSearchParams();
    if (params?.category) queryParams.append('category', params.category);
    if (params?.status) queryParams.append('status', params.status);
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.artStyle) queryParams.append('artStyle', params.artStyle);
    if (params?.search) queryParams.append('search', params.search);
    
    // Agregar filtros
    if (params?.filters) {
      if (params.filters.safetyLevel?.length) {
        queryParams.append('filters[safetyLevel]', params.filters.safetyLevel.join(','));
      }
      if (params.filters.species?.length) {
        queryParams.append('filters[species]', params.filters.species.join(','));
      }
      if (params.filters.deliveryDueDays?.length) {
        queryParams.append('filters[deliveryDueDays]', params.filters.deliveryDueDays.join(','));
      }
    }
    
    const finalUrl = queryParams.toString() ? `${url}?${queryParams.toString()}` : url;
    
    try {
      const response = await ApiUtils.get<AuctionResponse>(finalUrl);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async createAuction(auction: Partial<Auction>): Promise<Auction> {
    const url = `${API_URL}/auctions`;
    try {
      const response = await ApiUtils.post<{ data: Auction }>(url, auction, {
        "Content-Type": "application/json",
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async deleteAuction(id: string): Promise<void> {
    const url = `${API_URL}/auctions/${id}`;
    try {
      await ApiUtils.delete(url);
    } catch (error) {
      throw error;
    }
  }

  async getAuctionById(id: string): Promise<Auction> {
    const url = `${API_URL}/auctions/${id}`;
    try {
      const response = await ApiUtils.get<{ data: Auction }>(url);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async updateAuction(id: string, auction: Partial<Auction>): Promise<Auction> {
    const url = `${API_URL}/auctions/${id}`;
    try {
      const response = await ApiUtils.put<{ data: Auction }>(url, auction, {
        "Content-Type": "application/json",
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}