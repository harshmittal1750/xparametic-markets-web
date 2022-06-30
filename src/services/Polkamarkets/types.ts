import { Market } from 'models/market';
import { Portfolio } from 'models/portfolio';
import { Achievement } from 'types/achievement';
import { MarketState } from 'types/market';

// getMarketBySlug
export type GetMarketBySlugData = Market;
export type GetMarketBySlugArgs = {
  slug: string;
};

// getMarketsByState
export type GetMarketsByStateData = Market[];
export type GetMarketsByStateArgs = {
  state: MarketState;
  networkId?: string;
};

// getMarketsByIds
export type GetMarketsByIdsData = Market[];
export type GetMarketsByIdsArgs = {
  ids: string[];
  networkId?: string;
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

// getAchievements
export type GetAchievementsData = Achievement[];
export type GetAchievementsArgs = {
  networkId: string;
};

// getLeaderboardByTimeframe
export type GetLeaderboardByTimeframeData = {
  user: string;
  marketsCreated: number;
  volume: number;
  tvlVolume: number;
  liquidity: number;
  tvlLiquidity: number;
  claimWinningsCount: number;
  transactions: number;
  achievements: {
    id: number;
    name: string;
    image: string;
  }[];
}[];

export type GetLeaderboardByTimeframeArgs = {
  timeframe: '1w' | '1m' | 'at';
  networkId: string;
};
