import { ReactNode } from 'react';

import orderBy from 'lodash/orderBy';
import { GetLeaderboardByTimeframeData } from 'services/Polkamarkets/types';

import {
  FirstPlaceIcon,
  SecondPlaceIcon,
  ThirdPlaceIcon,
  MyPlaceIcon,
  RankUpIcon,
  RankDownIcon,
  RankStableIcon
} from 'assets/icons/pages/leaderboard';

import { LeaderboardTableRow } from './types';

const WALLET_PLACES = {
  1: {
    icon: <FirstPlaceIcon />,
    textColor: 'warning'
  },
  2: {
    icon: <SecondPlaceIcon />,
    textColor: 'violets-are-blue'
  },
  3: {
    icon: <ThirdPlaceIcon />,
    textColor: 'maximum-blue-green'
  }
};

// Table

// Columns

type WalletColumnRenderArgs = {
  isLoggedInUser: boolean;
  address: string;
  place: number;
};

function walletColumnRender({
  isLoggedInUser,
  address,
  place
}: WalletColumnRenderArgs) {
  const walletPlace = WALLET_PLACES[place] || {
    icon: null,
    textColor: '1'
  };

  return (
    <div className="pm-c-leaderboard-table__wallet">
      {walletPlace.icon}
      {isLoggedInUser ? <MyPlaceIcon /> : null}
      <span
        className={`caption semibold text-${
          isLoggedInUser ? '1' : walletPlace.textColor
        }`}
      >
        {`${address.substring(0, 6)}...${address.substring(
          address.length - 4
        )}`}
        {isLoggedInUser ? (
          <span className="caption semibold text-3">{` (You)`}</span>
        ) : null}
      </span>
    </div>
  );
}

type VolumeColumnRenderArgs = {
  volume: number;
  ticker: ReactNode;
};

function volumeColumnRender({ volume, ticker }: VolumeColumnRenderArgs) {
  return (
    <span className="pm-c-leaderboard-table__volume caption semibold text-1">
      {`${volume.toFixed(3)} `}
      {ticker}
    </span>
  );
}

type RankColumnRenderArgs = {
  place: number;
  change: 'up' | 'down' | 'stable';
};

function rankColumnRender({ place, change }: RankColumnRenderArgs) {
  return (
    <div className="pm-c-leaderboard-table__rank">
      <span className="caption semibold text-1">{place}</span>
      {change === 'up' ? <RankUpIcon /> : null}
      {change === 'down' ? <RankDownIcon /> : null}
      {change === 'stable' ? <RankStableIcon /> : null}
    </div>
  );
}

type AchievementsColumnRenderArgs = {
  id: number;
  name: string;
  image: string;
}[];

function achievementsColumnRender(achievements: AchievementsColumnRenderArgs) {
  return (
    <div className="pm-c-leaderboard-table__achievements-list">
      {achievements.slice(0, 3).map((achievement, index) => (
        <img
          id={`achievement${index}`}
          className="pm-c-leaderboard-table__achievement"
          key={achievement.id}
          src={achievement.image}
          alt={achievement.name}
        />
      ))}
    </div>
  );
}

export {
  walletColumnRender,
  volumeColumnRender,
  achievementsColumnRender,
  rankColumnRender
};

// Rows

export type PrepareLeaderboardTableRowsArgs = {
  rows?: GetLeaderboardByTimeframeData;
  ticker: ReactNode;
  sortBy: 'volume' | 'marketsCreated' | 'claimWinningsCount' | 'liquidity';
  loggedInUser?: string;
};

function prepareLeaderboardTableRows({
  rows = [],
  ticker,
  sortBy,
  loggedInUser
}: PrepareLeaderboardTableRowsArgs): LeaderboardTableRow[] {
  const sortedRows = orderBy(rows, sortBy, 'desc');

  return sortedRows.map((row, index) => {
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
