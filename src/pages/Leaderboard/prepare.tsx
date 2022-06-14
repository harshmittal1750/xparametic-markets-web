import isEmpty from 'lodash/isEmpty';
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
  ticker: string;
};

function volumeColumnRender({ volume, ticker }: VolumeColumnRenderArgs) {
  return (
    <span className="pm-c-leaderboard-table__volume caption semibold text-1">
      {`${volume.toFixed(3)} `}
      <strong className="caption semibold text-3">{ticker}</strong>
    </span>
  );
}

type LiquidityColumnRenderArgs = {
  liquidity: number;
  ticker: string;
};

function liquidityColumnRender({
  liquidity,
  ticker
}: LiquidityColumnRenderArgs) {
  return (
    <span className="pm-c-leaderboard-table__liquidity caption semibold text-1">
      {`${liquidity.toFixed(3)} `}
      <strong className="caption semibold text-3">{ticker}</strong>
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

function achievementsColumnRender(
  achievements: AchievementsColumnRenderArgs,
  size: 'medium' | 'small'
) {
  const visibleAchievements = achievements.slice(0, 3);
  const remainingAchievements = achievements.slice(3);

  return (
    <div className="pm-c-leaderboard-table__achievements-list">
      {!isEmpty(remainingAchievements) ? (
        <div
          id={`achievement${0}`}
          className={`pm-c-leaderboard-table__achievement--${size} pm-c-leaderboard-table__achievement--more`}
        >
          <span
            className={`${
              size === 'small' ? 'tiny' : 'caption'
            } semibold text-primary`}
          >
            {`${remainingAchievements.length}+`}
          </span>
        </div>
      ) : null}
      {visibleAchievements.slice(0, 3).map((achievement, index) => (
        <img
          id={`achievement${index}`}
          className={`pm-c-leaderboard-table__achievement--${size}`}
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
  liquidityColumnRender,
  rankColumnRender
};

// Rows

export type PrepareLeaderboardTableRowsArgs = {
  rows?: GetLeaderboardByTimeframeData;
  ticker: string;
  sortBy: string;
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
      liquidityAdded: {
        liquidity: row.liquidity,
        ticker
      },
      achievements: row.achievements,
      rank: {
        place: index + 1,
        change: 'stable'
      }
    };
  });
}

export { prepareLeaderboardTableRows };

// Your stats

function prepareLeaderboardYourStatsRow(rows: LeaderboardTableRow[]) {
  const yourStats = rows.find(row => row.wallet.isLoggedInUser);

  if (!yourStats) {
    return undefined;
  }

  return {
    rank: {
      value: {
        place: yourStats.rank.place,
        change: yourStats.rank.change
      },
      render: rankColumnRender
    },
    volume: {
      value: {
        volume: yourStats.volume.volume,
        ticker: yourStats.volume.ticker
      },
      render: volumeColumnRender
    },
    marketsCreated: {
      value: yourStats.marketsCreated
    },
    wonPredictions: {
      value: yourStats.wonPredictions
    },
    liquidityAdded: {
      value: {
        liquidity: yourStats.liquidityAdded.liquidity,
        ticker: yourStats.liquidityAdded.ticker
      },
      render: liquidityColumnRender
    },
    achievements: {
      value: yourStats.achievements,
      render: achievements => achievementsColumnRender(achievements, 'small')
    }
  };
}

export { prepareLeaderboardYourStatsRow };

// Top wallets

type TopWalletRenderArgs = {
  address: string;
  place: number;
};

function topWalletColumnRender({ address, place }: TopWalletRenderArgs) {
  const walletPlace = WALLET_PLACES[place] || {
    icon: null,
    textColor: '1'
  };

  return (
    <div className="pm-c-leaderboard-top-wallets__wallet">
      {walletPlace.icon}
      <span className={`caption semibold text-${walletPlace.textColor}`}>
        {`${address.substring(0, 6)}...${address.substring(
          address.length - 4
        )}`}
      </span>
    </div>
  );
}

type topWalletRowRenderArgs = {
  place: number;
  change: 'up' | 'down' | 'stable';
};

function topWalletRowRender({ place, change }: topWalletRowRenderArgs) {
  return (
    <div className="pm-c-leaderboard-table__rank">
      <span className="caption semibold text-1">{place}</span>
      {change === 'up' ? <RankUpIcon /> : null}
      {change === 'down' ? <RankDownIcon /> : null}
      {change === 'stable' ? <RankStableIcon /> : null}
    </div>
  );
}

export { topWalletColumnRender, topWalletRowRender };
