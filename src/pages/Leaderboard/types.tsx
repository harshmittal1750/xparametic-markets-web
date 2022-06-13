import { TableColumn } from 'components/new/Table';
import { TableMiniColumn, TableMiniRow } from 'components/new/TableMini';

// Table

export type LeaderboardTableColumn = TableColumn;

export type LeaderboardTableRow = {
  key: string;
  wallet: {
    isLoggedInUser: boolean;
    address: string;
    place: number;
  };
  volume: {
    volume: number;
    ticker: string;
  };
  marketsCreated: number;
  wonPredictions: number;
  liquidityAdded: {
    liquidity: number;
    ticker: string;
  };
  achievements: { id: number; name: string; image: string }[];
  rank: {
    place: number;
    change: 'up' | 'down' | 'stable';
  };
};

// Top Wallets

export type LeaderboardTopWalletsColumn = TableMiniColumn;
export type LeaderboardTopWalletsRow = TableMiniRow;
