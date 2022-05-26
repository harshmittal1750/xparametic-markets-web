/* eslint-disable import/prefer-default-export */
import { ReactNode } from 'react';

import orderBy from 'lodash/orderBy';
import { GetLeaderboardByTimeframeData } from 'services/Polkamarkets/types';

import { LeaderboardTableRow } from './types';

// Table

type PrepareLeaderboardTableRowsArgs = {
  data: GetLeaderboardByTimeframeData;
  ticker: ReactNode;
  sortBy: 'volume' | 'marketsCreated' | 'wonPredictions' | 'liquidityAdded';
  loggedInUser?: string;
};

function prepareLeaderboardTableRows({
  data,
  ticker,
  sortBy,
  loggedInUser
}: PrepareLeaderboardTableRowsArgs): LeaderboardTableRow[] {
  const sortedData = orderBy(data, sortBy, 'desc');

  return sortedData.map((row, index) => {
    const isLoggedInUser = loggedInUser === row.user;

    return {
      key: row.user,
      wallet: {
        isLoggedInUser,
        address: row.user,
        place: index + 1
      },
      volume: {
        volume: row.volume,
        ticker
      },
      marketsCreated: row.marketsCreated,
      wonPredictions: row.claimWinningsCount,
      liquidityAdded: row.liquidity,
      achievements: row.achievements,
      rank: {
        place: index + 1,
        change: 'stable'
      }
    };
  });
}

export { prepareLeaderboardTableRows };
