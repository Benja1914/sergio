import { ProfileData } from '@/services/profile.service';

export type { ProfileData, ProfileResponse as ProfileApiResponse } from '@/services/profile.service';

export interface ProfileState {
  profileData: ProfileData | null;
  isLoading: boolean;
  error: string | null;
}