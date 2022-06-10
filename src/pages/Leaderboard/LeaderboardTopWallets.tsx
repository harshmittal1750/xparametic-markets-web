import { TableMini } from 'components/new';

import { topWalletColumnRender, topWalletRowRender } from './prepare';
import { LeaderboardTopWalletsColumn, LeaderboardTopWalletsRow } from './types';

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

const row: LeaderboardTopWalletsRow = {
  firstPlace: {
    value: {
      address: 'Oxaaa',
      place: 1,
      change: 'up'
    },
    render: topWalletRowRender
  },
  secondPlace: {
    value: {
      address: 'Oxbbb',
      place: 2,
      change: 'down'
    },
    render: topWalletRowRender
  },
  thirdPlace: {
    value: {
      address: 'Oxccc',
      place: 3,
      change: 'stable'
    },
    render: topWalletRowRender
  }
};

function LeaderboardTopWallets() {
  return (
    <div className="pm-c-leaderboard-top-wallets bg-3 border-radius-medium border-solid border-1">
      <h2 className="body semibold text-1">Top Wallets</h2>
      <TableMini columns={columns} row={row} />
    </div>
  );
}

export default LeaderboardTopWallets;
