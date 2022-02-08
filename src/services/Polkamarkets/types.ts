import { Market } from 'models/market';
import { Portfolio } from 'models/portfolio';

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

// getMarketsByIds
export type GetMarketsByIdsData = Market[];
export type GetMarketsByIdsArgs = {
  ids: string[];
};

// reloadMarketBySlug
export type ReloadMarketBySlugData = void;
export type ReloadMarketBySlugArgs = {
  slug: string;
};

// createMarketById
export type CreateMarketByIdData = Market;
export type CreateMarketByIdArgs = {
  id: string;
};

// getPortfolioByAddress
export type GetPortfolioByAddressData = Portfolio;
export type GetPortfolioByAddressArgs = {
  address: string;
};

// reloadPortfolioByAddress
export type ReloadPortfolioByAddressData = void;
export type ReloadPortfolioByAddressArgs = {
  address: string;
};
