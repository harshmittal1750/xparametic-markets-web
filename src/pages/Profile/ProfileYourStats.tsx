import { useState } from 'react';

import { useGetLeaderboardByAddressQuery } from 'services/Polkamarkets';
import { Skeleton } from 'ui';

import { Dropdown, Text } from 'components/new';

import { useNetwork } from 'hooks';

import ProfileLeaderboardRanks from './ProfileLeaderboardRanks';
import ProfilePredictionStatistics from './ProfilePredictionStatistics';

type Timeframe = '1w' | '1m' | 'at';

type ProfileYourStatsProps = {
  address: string;
};

function ProfileYourStats({ address }: ProfileYourStatsProps) {
  const network = useNetwork();
  const [timeframe, setTimeframe] = useState<Timeframe>('at');
  const leaderboard = useGetLeaderboardByAddressQuery({
    address,
    networkId: network.network.id,
    timeframe
  });
  const ticker =
    network.network.currency.symbol || network.network.currency.ticker;

  if (leaderboard.isLoading)
    return (
      <div className="flex-column gap-5">
        <div className="flex-row justify-space-between align-center padding-top-5">
          <Text as="h2" fontSize="heading-2" fontWeight="semibold" color="1">
            Statistics
          </Text>
          <Skeleton style={{ marginLeft: 'auto', width: 48, height: 24 }} />
        </div>
        <div className="pm-p-profile-your-stats">
          <Skeleton style={{ height: 96 }} />
          <Skeleton style={{ height: 96 }} />
        </div>
      </div>
    );

  if (!leaderboard.data) return <>Error fetching Leaderboard data</>;

  return (
    <div className="flex-column gap-5">
      <div className="flex-row justify-space-between align-center padding-top-5">
        <Text as="h2" fontSize="heading-2" fontWeight="semibold" color="1">
          Statistics
        </Text>
        <Dropdown
          key="timeframe"
          defaultOption="at"
          options={[
            { label: 'Weekly', value: '1w' },
            { label: 'Monthly', value: '1m' },
            { label: 'All-time', value: 'at' }
          ]}
          onSelect={value => setTimeframe(value)}
        />
      </div>
      <div className="pm-p-profile-your-stats">
        <ProfileLeaderboardRanks
          ranks={{
            rankByVolume: leaderboard.data.rank.volume,
            rankByMarketsCreated: leaderboard.data.rank.marketsCreated,
            rankByWonPredictions: leaderboard.data.rank.claimWinningsCount,
            rankByLiquidityAdded: leaderboard.data.rank.tvlLiquidity
          }}
          isLoading={false}
        />
        <ProfilePredictionStatistics
          statistics={{
            volume: leaderboard.data.volume,
            marketsCreated: leaderboard.data.marketsCreated,
            wonPredictions: leaderboard.data.claimWinningsCount,
            liquidityAdded: leaderboard.data.liquidity
          }}
          ticker={ticker}
          isLoading={false}
        />
      </div>
    </div>
  );
}

export default ProfileYourStats;
