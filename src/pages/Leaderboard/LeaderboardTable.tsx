import { useMemo } from 'react';

import { Table } from 'components/new';

import {
  prepareLeaderboardTableRows,
  PrepareLeaderboardTableRowsArgs
} from './prepare';
import { LeaderboardTableColumn } from './types';

type LeaderboardTableProps = {
  loggedInUser?: string;
  columns: LeaderboardTableColumn[];
  ticker: string;
  explorerURL: string;
  isLoading: boolean;
} & Pick<PrepareLeaderboardTableRowsArgs, 'rows' | 'sortBy'>;

function LeaderboardTable({
  loggedInUser,
  columns,
  rows,
  ticker,
  explorerURL,
  sortBy,
  isLoading
}: LeaderboardTableProps) {
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

  const tableMinWidth = loggedInUser ? 1200 : 950;

  return (
    <Table
      height={700}
      minWidth={tableMinWidth}
      columns={columns}
      rows={preparedRows}
      isLoadingData={isLoading}
    />
  );
}

export default LeaderboardTable;
