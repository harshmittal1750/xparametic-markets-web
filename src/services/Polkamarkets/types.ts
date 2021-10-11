import { Market } from 'models/market';

// getMarketBySlug
export type GetMarketBySlugData = Market;
export type GetMarketBySlugArgs = {
  slug: string;
};

// getMarketsByState
export type GetMarketByStateData = Market[];
export type GetMarketByStateArgs = {
  state: 'open' | 'closed' | 'resolved';
};
