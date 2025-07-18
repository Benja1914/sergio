import { ApiUtils } from "@/utils/api.utils";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api/v1";

export interface Publication {
  id: string;
  content: string;
  attachedImage?: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  username?: string;
  userImage?: string;
  likes?: number;
  isLiked?: boolean;
}

interface ApiPublication {
  id: string;
  publication_user_id: string;
  content: string | null;
  attachedFileUrl: string | null;
  createdAt: string;
  updatedAt: string;
  username?: string;
  email?: string;
  type?: string;
}

export interface PublicationResponse {
  status: string;
  message: string;
  data: ApiPublication[];
}

export interface CreatePublicationRequest {
  content: string;
  attachedImage?: string;
}

export class PublicationsService {
  // Convertir ApiPublication a Publication
  private mapApiPublicationToPublication(apiPub: ApiPublication): Publication {
    return {
      id: apiPub.id,
      content: apiPub.content || '', // Manejar content null
      attachedImage: apiPub.attachedFileUrl || undefined,
      createdAt: apiPub.createdAt,
      updatedAt: apiPub.updatedAt,
      userId: apiPub.publication_user_id,
      username: apiPub.username,
      userImage: undefined, // No viene en la API
      likes: 0, // No viene en la API
      isLiked: false // No viene en la API
    };
  }

  // Obtener publications de un usuario específico
  async getUserPublications(userId: string): Promise<Publication[]> {
    const url = `${API_URL}/publications/user/${userId}`;
    
    try {
      const response = await ApiUtils.get<PublicationResponse>(url);
      
      // Manejar diferentes estructuras de respuesta
      if (Array.isArray(response)) {
        // Si response es directamente un array de ApiPublication
        return response.map(pub => this.mapApiPublicationToPublication(pub));
      } else if (response && Array.isArray(response.data)) {
        // Si response tiene estructura {status, message, data}
        return response.data.map(pub => this.mapApiPublicationToPublication(pub));
      } else {
        console.warn('Unexpected API response structure for getUserPublications:', response);
        return [];
      }
    } catch (error) {
      console.error('Error in getUserPublications:', error);
      throw error;
    }
  }

  // Obtener todas las publications
  async getAllPublications(page?: number, limit?: number): Promise<Publication[]> {
    const url = `${API_URL}/publications`;
    const queryParams = new URLSearchParams();
    
    if (page) queryParams.append('page', page.toString());
    if (limit) queryParams.append('limit', limit.toString());
    
    const finalUrl = queryParams.toString() ? `${url}?${queryParams.toString()}` : url;
    
    try {
      const response = await ApiUtils.get<PublicationResponse>(finalUrl);
      return response.data ? response.data.map(pub => this.mapApiPublicationToPublication(pub)) : [];
    } catch (error) {
      console.error('Error in getAllPublications:', error);
      throw error;
    }
  }

  // Crear una nueva publication
  async createPublication(publicationData: CreatePublicationRequest): Promise<Publication> {
    const url = `${API_URL}/publications`;
    
    try {
      const response = await ApiUtils.post<{ data: Publication }>(url, publicationData, {
        "Content-Type": "application/json",
      });
      return response.data;
    } catch (error) {
      console.error('Error creating publication:', error);
      throw error;
    }
  }

  // Dar like a una publication
  async likePublication(publicationId: string): Promise<void> {
    const url = `${API_URL}/publications/${publicationId}/like`;
    
    try {
      await ApiUtils.post(url, {}, {
        "Content-Type": "application/json",
      });
    } catch (error) {
      console.error('Error liking publication:', error);
      throw error;
    }
  }

  // Quitar like de una publication
  async unlikePublication(publicationId: string): Promise<void> {
    const url = `${API_URL}/publications/${publicationId}/unlike`;
    
    try {
      await ApiUtils.post(url, {}, {
        "Content-Type": "application/json",
      });
    } catch (error) {
      console.error('Error unliking publication:', error);
      throw error;
    }
  }

  // Eliminar una publication
  async deletePublication(publicationId: string): Promise<void> {
    const url = `${API_URL}/publications/${publicationId}`;
    
    try {
      await ApiUtils.delete(url);
    } catch (error) {
      console.error('Error deleting publication:', error);
      throw error;
    }
  }

  // Obtener publication por ID
  async getPublicationById(publicationId: string): Promise<Publication> {
    const url = `${API_URL}/publications/${publicationId}`;
    
    try {
      const response = await ApiUtils.get<{ data: Publication }>(url);
      return response.data;
    } catch (error) {
      console.error('Error getting publication by ID:', error);
      throw error;
    }
  }
}