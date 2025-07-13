// Interfaz para definir la estructura de una auction
export interface Auction {
  id: string;
  title: string;
  images: string[];
  startingBid: number; // SB - Starting Bid
  minimumBid: number;  // MB - Minimum Bid
  currentBid?: number;
  description?: string;
  endDate?: string;
  status?: 'active' | 'ended' | 'upcoming';
}

export interface AuctionsComponentProps {
  auctions: Auction[];
  className?: string;
}