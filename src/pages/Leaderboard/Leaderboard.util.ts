import type {
  GetLeaderboardBaseData,
  GetLeaderboardGroupBySlugData
} from 'services/Polkamarkets/types';

import type { CreateLeaderboardGroupFormValues } from 'components/CreateLeaderboardGroupForm';

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

const sanitizePreviousCreateLeaderboardFormValues = (
  values: GetLeaderboardGroupBySlugData
): CreateLeaderboardGroupFormValues => {
  return {
    name: values.title,
    addresses: values.users.join('\n')
  };
};

export {
  emptyLeaderboardRowWithoutUser,
  sanitizePreviousCreateLeaderboardFormValues
};
