export interface RenderLevels {
  sketch?: number;
  "full render"?: number;
}

export interface Addons {
  background?: number;
  "extra character"?: number;
}

export interface Extras {
  NSFW?: number;
  "outfit change"?: number;
}

export interface Auction {
  id: string;
  startingBidPrice: string;
  minimumBidIncrement: string;
  autoBuyPrice: string;
  auctionEndDate: string;
  auctionStatus: "open" | "closed" | "pending";
  currentPrice: string;
  offerPrice?: string | null;
  sniping: number;
  promotedTime?: string | null;
  createdAt: string;
  updatedAt: string;
  title: string;
  description: string;
  auction_user_id: string;
  auction_category_id: string;
  attachedImage: string;
  safety: "safe" | "nsfw";
  artStyle: "anime" | "realistic" | "cartoon" | "abstract";
  version: number;
  paymentDueDays: number;
  deliveryDueDays: number;
  renderLevels?: RenderLevels | null;
  addons?: Addons | null;
  extras?: Extras | null;
  username: string;
  type: "admin" | "seller" | "buyer";
  tags?: string[] | null;
  species?: string[] | null;
}

export interface AuctionState {
  auctions: Auction[];
  isLoading: boolean;
  error?: string | null;
}

export interface AuctionResponse {
  status: string;
  message: string;
  data: Auction[];
}