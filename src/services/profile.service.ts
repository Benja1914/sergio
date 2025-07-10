
import { ApiUtils } from "@/utils/api.utils";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api/v1";

export interface ProfileData {
  id: string;
  username: string;
  email: string;
  type: "admin" | "seller" | "buyer";
  createdAt: string;
  updatedAt: string;
  userImage: string | null;
  userBanner: string | null;
  description: string | null;
  deviantArt: string | null;
  x: string | null;
  emailStatus: "pending" | "verified";
  status: "active" | "inactive";
}

export interface ProfileResponse {
  status: "success" | "error";
  message: string;
  data: ProfileData;
}

export class ProfileService {
  static async getUserProfile(userId: string): Promise<ProfileResponse> {
    const url = `${API_URL}/users/${userId}`;

    try {
      const response = await ApiUtils.get<ProfileResponse>(url, {
        "Content-Type": "application/json",
      });

      return response;
    } catch (error) {
      throw error;
    }
  }
}