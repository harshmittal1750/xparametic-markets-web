import type {
  GetLeaderboardBaseData,
  GetLeaderboardByTimeframeData,
  GetLeaderboardGroupBySlugData
} from 'services/Polkamarkets/types';
import type { LeaderboardGroup } from 'types/leaderboard';

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

function buildLeaderboardData(
  isLoadingLeaderboardGroup: boolean,
  leaderboardGroup?: LeaderboardGroup,
  leaderboardByTimeframe?: GetLeaderboardByTimeframeData
): GetLeaderboardByTimeframeData {
  if (leaderboardByTimeframe && leaderboardGroup) {
    return leaderboardGroup.users.map(user => {
      const userInLeaderboardByTimeframe = leaderboardByTimeframe.find(
        row => row.user === user
      );

      return (
        userInLeaderboardByTimeframe || {
          user,
          ...emptyLeaderboardRowWithoutUser
        }
      );
    });
  }

  if (leaderboardByTimeframe && !isLoadingLeaderboardGroup) {
    return leaderboardByTimeframe;
  }

  return [];
}

export {
  emptyLeaderboardRowWithoutUser,
  sanitizePreviousCreateLeaderboardFormValues,
  buildLeaderboardData
};
