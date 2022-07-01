import { useMemo } from 'react';

import LeaderboardStats from './LeaderboardStats';
import {
  PrepareLeaderboardTableRowsArgs,
  prepareLeaderboardTopWalletsRow,
  topWalletColumnRender
} from './prepare';
import { LeaderboardTopWalletsColumn } from './types';

const columns: LeaderboardTopWalletsColumn[] = [
  {
    key: 'firstPlace',
    title: 'First place',
    render: topWalletColumnRender
  },
  {
    key: 'secondPlace',
    title: 'Second place',
    render: topWalletColumnRender
  },
  {
    key: 'thirdPlace',
    title: 'Third place',
    render: topWalletColumnRender
  }
];

type LeaderboardTopWalletsProps = {
  explorerURL: string;
  isLoading: boolean;
} & Pick<PrepareLeaderboardTableRowsArgs, 'rows' | 'sortBy'>;

function LeaderboardTopWallets({
  rows,
  sortBy,
  explorerURL,
  isLoading
}: LeaderboardTopWalletsProps) {
  const row = useMemo(
    () => prepareLeaderboardTopWalletsRow({ rows, sortBy, explorerURL }),
    [rows, sortBy, explorerURL]
  );

  return (
    <LeaderboardStats
      title="Top Wallets"
      columns={columns}
      row={row}
      isLoading={isLoading}
    />
  );
}

export default LeaderboardTopWallets;
