import { useMemo } from 'react';

import { prepareLeaderboardRanksRow } from './prepare';
import ProfileStats from './ProfileStats';
import { LeaderboardRanksColumn } from './types';

const columns: LeaderboardRanksColumn[] = [
  {
    key: 'rankByVolume',
    title: 'Rank (By Volume)'
  },
  {
    key: 'rankByMarketsCreated',
    title: 'Rank (By Markets Created)'
  },
  {
    key: 'rankByWonPredictions',
    title: 'Rank (By Won Predictions)'
  },
  {
    key: 'rankByLiquidityAdded',
    title: 'Rank (By Liquidity Added)'
  }
];

type ProfileLeaderboardRanksProps = {
  isLoading: boolean;
};

function ProfileLeaderboardRanks({ isLoading }: ProfileLeaderboardRanksProps) {
  const row = useMemo(() => prepareLeaderboardRanksRow(), []);

  return (
    <ProfileStats
      title="Leaderboard Ranks"
      columns={columns}
      row={row}
      isLoading={isLoading}
    />
  );
}

export default ProfileLeaderboardRanks;
