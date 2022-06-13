import { memo } from 'react';

import TableMini, {
  TableMiniColumn,
  TableMiniRow
} from 'components/new/TableMini';

type LeaderboardStatsProps = {
  title: string;
  columns: TableMiniColumn[];
  row: TableMiniRow;
  isLoading: boolean;
};

function LeaderboardStats({
  title,
  columns,
  row,
  isLoading
}: LeaderboardStatsProps) {
  return (
    <div className="pm-c-leaderboard-stats bg-3 border-radius-medium border-solid border-1">
      <h2 className="body semibold text-1">{title}</h2>
      {!isLoading ? (
        <TableMini columns={columns} row={row} />
      ) : (
        <div className="flex-row justify-center align-center width-full padding-y-9 padding-x-4">
          <span className="spinner--primary" />
        </div>
      )}
    </div>
  );
}

export default memo(LeaderboardStats);
