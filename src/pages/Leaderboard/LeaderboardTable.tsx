import { useMemo } from 'react';

import { Table } from 'components/new';
import { TableColumn } from 'components/new/Table';

import {
  prepareLeaderboardTableRows,
  PrepareLeaderboardTableRowsArgs
} from './prepare';

type LeaderboardTableProps = {
  columns: TableColumn[];
  currency: string;
  isLoading: boolean;
} & Pick<PrepareLeaderboardTableRowsArgs, 'rows' | 'sortBy'>;

function LeaderboardTable({
  columns,
  rows,
  currency,
  sortBy,
  isLoading
}: LeaderboardTableProps) {
  const preparedRows = useMemo(
    () =>
      prepareLeaderboardTableRows({
        rows,
        sortBy,
        ticker: currency
      }),
    [currency, rows, sortBy]
  );

  return (
    <Table columns={columns} rows={preparedRows} isLoadingData={isLoading} />
  );
}

export default LeaderboardTable;
