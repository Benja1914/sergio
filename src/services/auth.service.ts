import { ApiUtils } from "@/utils/api.utils";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api/v1";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignupRequest {
  email: string;
  username: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  createdAt: Date;
  description: string;
  deviantArt: any;
  email: string;
  emailStatus: string;
  id: string;
  status:string;
  type:string
  updatedAt: Date;
  userBanner: string;
  userImage: string;
  username: string;
}
export interface SignupResponse {
  token: string;
  user: {
    id: string;
    email: string;
    name?: string;
    avatar?: string;
  };
}

export class AuthService {
  setCookie(name: string, value: string, days = 7) {
    const expires = new Date(Date.now() + days * 864e5).toUTCString();
    document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/`;
  }

  getCookie(name: string): string | null {
    return document.cookie.split('; ').reduce((r, v) => {
      const parts = v.split('=');
      return parts[0] === name ? decodeURIComponent(parts[1]) : r
    }, null as string | null);
  }

  deleteCookie(name: string) {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  }

  async login(credentials: LoginRequest): Promise<LoginResponse> {
    const url = `${API_URL}/auth/login`;

    try {
      const response = await ApiUtils.post<any>(url, credentials, {
        "Content-Type": "application/json",
      });
      console.log('response', response);

      // Accede a response.data
      const data = response.data;

      if (data && data.accessToken) {
        this.setCookie('authToken', data.accessToken);
        this.setCookie('user', JSON.stringify({
          id: data.id,
          email: data.email,
          username: data.username,
          userImage: data.userImage,
          userBanner: data.userBanner,
        }));
      }

      return data;
    } catch (error) {
      throw error;
    }
  }

  async signup(credentials: SignupRequest): Promise<SignupResponse> {
    const url = `${API_URL}/auth/register`;

    try {
      const response = await ApiUtils.post<SignupResponse>(url, credentials, {
        "Content-Type": "application/json",
      });

      // Guardar token y usuario en cookies
      if (response.token) {
        this.setCookie('authToken', response.token);
        this.setCookie('user', JSON.stringify(response.user));
      }

      return response;
    } catch (error) {
      throw error;
    }
  }

  async logout(): Promise<void> {
    try {
      this.deleteCookie('authToken');
      this.deleteCookie('user');
    } catch (error) {
      throw error;
    }
  }

  getToken(): string | null {
    if (typeof window !== 'undefined') {
      return this.getCookie('authToken');
    }
    return null;
  }

  getUser(): any | null {
    if (typeof window !== 'undefined') {
      const user = this.getCookie('user');
      return user ? JSON.parse(user) : null;
    }
    return null;
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}