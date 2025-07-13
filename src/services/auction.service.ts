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

  async getUserAuctions(userId: string, params?: Omit<GetAuctionsParams, 'search'>): Promise<Auction[]> {
    const url = `${API_URL}/auctions/user/${userId}`;
    
    // Construir query parameters
    const queryParams = new URLSearchParams();
    if (params?.category) queryParams.append('category', params.category);
    if (params?.status) queryParams.append('status', params.status);
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.artStyle) queryParams.append('artStyle', params.artStyle);
    
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
      
      // Tu interfaz AuctionResponse tiene la estructura: { status, message, data: Auction[] }
      // Entonces solo necesitamos acceder a response.data
      return response.data || [];
    } catch (error) {
      console.error('Error in getUserAuctions:', error);
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

  // Métodos adicionales útiles

  async getActiveAuctions(params?: Omit<GetAuctionsParams, 'status'>): Promise<Auction[]> {
    return this.getAuctions({
      ...params,
      status: 'open'
    });
  }

  async getClosedAuctions(params?: Omit<GetAuctionsParams, 'status'>): Promise<Auction[]> {
    return this.getAuctions({
      ...params,
      status: 'closed'
    });
  }

  async getPendingAuctions(params?: Omit<GetAuctionsParams, 'status'>): Promise<Auction[]> {
    return this.getAuctions({
      ...params,
      status: 'pending'
    });
  }

  async searchAuctions(query: string, params?: Omit<GetAuctionsParams, 'search'>): Promise<Auction[]> {
    return this.getAuctions({
      ...params,
      search: query
    });
  }

  async getAuctionsByCategory(category: string, params?: Omit<GetAuctionsParams, 'category'>): Promise<Auction[]> {
    return this.getAuctions({
      ...params,
      category
    });
  }

  async getAuctionsByArtStyle(artStyle: "anime" | "realistic" | "cartoon" | "abstract", params?: Omit<GetAuctionsParams, 'artStyle'>): Promise<Auction[]> {
    return this.getAuctions({
      ...params,
      artStyle
    });
  }

  // Métodos para interacciones con auctions (si tu API los soporta)

  async placeBid(auctionId: string, bidAmount: number): Promise<void> {
    const url = `${API_URL}/auctions/${auctionId}/bid`;
    try {
      await ApiUtils.post(url, { amount: bidAmount }, {
        "Content-Type": "application/json",
      });
    } catch (error) {
      throw error;
    }
  }

  async watchAuction(auctionId: string): Promise<void> {
    const url = `${API_URL}/auctions/${auctionId}/watch`;
    try {
      await ApiUtils.post(url, {}, {
        "Content-Type": "application/json",
      });
    } catch (error) {
      throw error;
    }
  }

  async unwatchAuction(auctionId: string): Promise<void> {
    const url = `${API_URL}/auctions/${auctionId}/unwatch`;
    try {
      await ApiUtils.post(url, {}, {
        "Content-Type": "application/json",
      });
    } catch (error) {
      throw error;
    }
  }

  async getWatchedAuctions(userId: string): Promise<Auction[]> {
    const url = `${API_URL}/users/${userId}/watched-auctions`;
    try {
      const response = await ApiUtils.get<AuctionResponse>(url);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async getBidHistory(auctionId: string): Promise<any[]> {
    const url = `${API_URL}/auctions/${auctionId}/bids`;
    try {
      const response = await ApiUtils.get<{ data: any[] }>(url);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async getUserBids(userId: string): Promise<any[]> {
    const url = `${API_URL}/users/${userId}/bids`;
    try {
      const response = await ApiUtils.get<{ data: any[] }>(url);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Método para obtener estadísticas de auctions (si tu API lo soporta)
  async getAuctionStats(): Promise<any> {
    const url = `${API_URL}/auctions/stats`;
    try {
      const response = await ApiUtils.get<{ data: any }>(url);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async getUserAuctionStats(userId: string): Promise<any> {
    const url = `${API_URL}/auctions/user/${userId}/stats`;
    try {
      const response = await ApiUtils.get<{ data: any }>(url);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}