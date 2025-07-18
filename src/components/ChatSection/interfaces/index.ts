export interface Post {
  id: string;
  username: string;
  userImage: string;
  timestamp: string;
  content: string;
  image?: string;
  likes: number;
  isLiked?: boolean;
}

export interface ChatSectionProps {
  userImage?: string | null;
  username?: string | null;
  userId?: string;
  className?: string;
  }