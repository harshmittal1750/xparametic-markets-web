import LeaderboardStats from './LeaderboardStats';
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

type LeaderboardTopWalletsProps = {
  isLoading: boolean;
};

function LeaderboardTopWallets({ isLoading }: LeaderboardTopWalletsProps) {
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
