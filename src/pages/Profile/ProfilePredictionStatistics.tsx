import { useMemo } from 'react';

import { preparePredictionStatisticsRow } from './prepare';
import ProfileStats from './ProfileStats';
import { PredictionStatisticsColumn } from './types';

const columns: PredictionStatisticsColumn[] = [
  {
    key: 'volume',
    title: 'Volume'
  },
  {
    key: 'marketsCreated',
    title: 'Markets Created'
  },
  {
    key: 'wonPredictions',
    title: 'Won Predictions'
  },
  {
    key: 'liquidityAdded',
    title: 'Liquidity Added'
  }
];

type ProfilePredictionStatisticsProps = {
  ticker: string;
  isLoading: boolean;
};

function ProfilePredictionStatistics({
  ticker,
  isLoading
}: ProfilePredictionStatisticsProps) {
  const row = useMemo(
    () => preparePredictionStatisticsRow({ ticker }),
    [ticker]
  );

  return (
    <ProfileStats
      title="Prediction Statistics"
      columns={columns}
      row={row}
      isLoading={isLoading}
    />
  );
}

export default ProfilePredictionStatistics;
