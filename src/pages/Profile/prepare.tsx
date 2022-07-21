import {
  rankColumnRender,
  volumeColumnRender,
  liquidityColumnRender
} from 'pages/Leaderboard/prepare';

import { LeaderboardRanksRow, PredictionStatisticsRow } from './types';

function prepareLeaderboardRanksRow(): LeaderboardRanksRow {
  return {
    rankByVolume: {
      value: {
        place: 3418,
        change: 'up'
      },
      render: rankColumnRender
    },
    rankByMarketsCreated: {
      value: {
        place: 3418,
        change: 'down'
      },
      render: rankColumnRender
    },
    rankByWonPredictions: {
      value: {
        place: 3418,
        change: 'stable'
      },
      render: rankColumnRender
    },
    rankByLiquidityAdded: {
      value: {
        place: 3418,
        change: 'up'
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
