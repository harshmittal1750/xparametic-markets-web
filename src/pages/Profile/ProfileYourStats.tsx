import { useState } from 'react';

import { Dropdown, Text } from 'components/new';

import { useNetwork } from 'hooks';

import ProfileLeaderboardRanks from './ProfileLeaderboardRanks';
import ProfilePredictionStatistics from './ProfilePredictionStatistics';

type Timeframe = '1w' | '1m' | 'at';

function ProfileYourStats() {
  // Custom hooks
  const { network } = useNetwork();
  const { currency } = network;

  // Local state
  const [timeframe, setTimeframe] = useState<Timeframe>('1w');

  const ticker = currency.symbol || currency.ticker;

  return (
    <div className="flex-column gap-5">
      <div className="flex-row justify-space-between align-center padding-top-5">
        <Text as="h2" fontSize="heading-2" fontWeight="semibold" color="1">
          Statistics
        </Text>
        <Dropdown
          key="timeframe"
          defaultOption="1w"
          options={[
            { label: 'Weekly', value: '1w' },
            { label: 'Monthly', value: '1m' },
            { label: 'All-time', value: 'at' }
          ]}
          onSelect={value => setTimeframe(value)}
        />
      </div>
      <div className="flex-row justify-center align-start gap-6">
        <ProfileLeaderboardRanks isLoading={false} />
        <ProfilePredictionStatistics ticker={ticker} isLoading={false} />
      </div>
    </div>
  );
}

export default ProfileYourStats;
