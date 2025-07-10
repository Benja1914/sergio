// Re-exportar desde el servicio para consistencia
export type { LoginResponse as LoginApiResponse } from '@/services/auth.service';

// Usuario extraído de la respuesta
export interface User {
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

// Estado del store
export interface AuthState {
  user: User | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  // Guardamos la respuesta completa del servicio
  loginResponse: import('@/services/auth.service').LoginResponse | null;
}