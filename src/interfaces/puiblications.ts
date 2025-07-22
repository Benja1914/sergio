
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

export interface ApiPublication {
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
      publication_user_id:string;

  content: string;
  attachedImage?: string;
}