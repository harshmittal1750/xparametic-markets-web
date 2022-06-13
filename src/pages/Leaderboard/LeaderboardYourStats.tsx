import { useMemo } from 'react';

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
  isLoading: boolean;
} & Pick<PrepareLeaderboardTableRowsArgs, 'rows' | 'sortBy'>;

function LeaderboardYourStats({
  loggedInUser,
  ticker,
  rows,
  sortBy,
  isLoading
}: LeaderboardYourStatsProps) {
  const preparedRows = useMemo(
    () =>
      prepareLeaderboardTableRows({
        loggedInUser,
        rows,
        sortBy,
        ticker
      }),
    [ticker, loggedInUser, rows, sortBy]
  );

  const row = useMemo(
    () => prepareLeaderboardYourStatsRow(preparedRows),
    [preparedRows]
  );

  if (!loggedInUser || !row) return null;

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
