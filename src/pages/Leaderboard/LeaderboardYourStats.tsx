import { useMemo } from 'react';

import some from 'lodash/some';

import { TableMiniColumn } from 'components/new/TableMini';

import LeaderboardStats from './LeaderboardStats';
import {
  prepareLeaderboardTableRows,
  PrepareLeaderboardTableRowsArgs,
  prepareLeaderboardYourStatsRow
} from './prepare';

const columns: TableMiniColumn[] = [
  {
    key: 'rank',
    title: 'Rank'
  },
  {
    key: 'volume',
    title: 'Volume'
  },
  {
    key: 'marketsCreated',
    title: 'Markets Created'
  },
  {
    key: 'wonPredictions',
    title: 'Won Predictions'
  },
  {
    key: 'liquidityAdded',
    title: 'Liquidity Added'
  },
  {
    key: 'achievements',
    title: 'NFT Achievements'
  }
];

type LeaderboardYourStatsProps = {
  loggedInUser?: string;
  ticker: string;
  explorerURL: string;
  isLoading: boolean;
} & Pick<PrepareLeaderboardTableRowsArgs, 'rows' | 'sortBy'>;

function LeaderboardYourStats({
  loggedInUser,
  rows,
  sortBy,
  ticker,
  explorerURL,
  isLoading
}: LeaderboardYourStatsProps) {
  const preparedRows = useMemo(
    () =>
      prepareLeaderboardTableRows({
        loggedInUser,
        rows,
        sortBy,
        ticker,
        explorerURL
      }),
    [loggedInUser, rows, sortBy, ticker, explorerURL]
  );

  const row = useMemo(
    () => prepareLeaderboardYourStatsRow(preparedRows),
    [preparedRows]
  );

  const userHasPlaceInLeaderboard = useMemo(
    () =>
      some(
        preparedRows.map(r => r.wallet.isLoggedInUser),
        item => item === true
      ),
    [preparedRows]
  );

  if (!isLoading && (!loggedInUser || !userHasPlaceInLeaderboard)) return null;

  return (
    <LeaderboardStats
      title="Your Stats"
      columns={columns}
      row={row}
      isLoading={isLoading}
    />
  );
}

export default LeaderboardYourStats;
