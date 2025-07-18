import { Publication } from '@/services/publications.service';

export interface PublicationsState {
  publications: Publication[];
  userPublications: { [userId: string]: Publication[] };
  isLoading: boolean;
  error: string | null;
}

export { Publication };