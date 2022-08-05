import {
  rankColumnRender,
  volumeColumnRender,
  liquidityColumnRender
} from 'pages/Leaderboard/prepare';

import {
  LeaderboardRanks,
  LeaderboardRanksRow,
  PredictionStatisticsRow
} from './types';

function prepareLeaderboardRanksRow(
  ranks: LeaderboardRanks
): LeaderboardRanksRow {
  return {
    rankByVolume: {
      value: {
        place: ranks.rankByVolume,
        change: 'stable'
      },
      render: rankColumnRender
    },
    rankByMarketsCreated: {
      value: {
        place: ranks.rankByMarketsCreated,
        change: 'stable'
      },
      render: rankColumnRender
    },
    rankByWonPredictions: {
      value: {
        place: ranks.rankByWonPredictions,
        change: 'stable'
      },
      render: rankColumnRender
    },
    rankByLiquidityAdded: {
      value: {
        place: ranks.rankByLiquidityAdded,
        change: 'stable'
      },
      render: rankColumnRender
    }
  };
}

type PreparePredictionStatisticsRowArgs = {
  ticker: string;
};

function preparePredictionStatisticsRow({
  ticker
}: PreparePredictionStatisticsRowArgs): PredictionStatisticsRow {
  return {
    volume: {
      value: {
        volume: 0.126,
        ticker
      },
      render: volumeColumnRender
    },
    marketsCreated: {
      value: 47
    },
    wonPredictions: {
      value: 12
    },
    liquidityAdded: {
      value: {
        liquidity: 0.126,
        ticker
      },
      render: liquidityColumnRender
    }
  };
}

export { prepareLeaderboardRanksRow, preparePredictionStatisticsRow };
