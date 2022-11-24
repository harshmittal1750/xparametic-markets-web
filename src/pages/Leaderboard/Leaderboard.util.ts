/* eslint-disable import/prefer-default-export */
import { GetLeaderboardBaseData } from 'services/Polkamarkets/types';

const emptyLeaderboardRowWithoutUser: Omit<GetLeaderboardBaseData, 'user'> = {
  marketsCreated: 0,
  volume: 0,
  tvlVolume: 0,
  liquidity: 0,
  tvlLiquidity: 0,
  claimWinningsCount: 0,
  transactions: 0,
  erc20Balance: 0,
  achievements: []
};

export { emptyLeaderboardRowWithoutUser };
