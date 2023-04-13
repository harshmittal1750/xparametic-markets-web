import type { GetLeaderboardByAddressData } from 'services/Polkamarkets/types';
import type { LeaderboardTimeframe } from 'types/leaderboard';
import { Skeleton } from 'ui';

import { AlertMini } from 'components';
import { Dropdown, Text } from 'components/new';

import ProfileLeaderboardRanks from './ProfileLeaderboardRanks';
import ProfilePredictionStatistics from './ProfilePredictionStatistics';

type ProfileYourStatsProps = {
  onTimeframe(arg: LeaderboardTimeframe): void;
  data?: GetLeaderboardByAddressData;
  isLoading: boolean;
  ticker: string;
};

function ProfileYourStats({
  ticker,
  onTimeframe,
  data,
  isLoading
}: ProfileYourStatsProps) {
  return (
    <div className="flex-column gap-5">
      <div className="flex-row justify-space-between align-center padding-top-5">
        <Text as="h2" fontSize="heading-2" fontWeight="semibold" color="1">
          Statistics
        </Text>
        {(!isLoading || data) && (
          <Dropdown
            key="timeframe"
            defaultOption="at"
            options={[
              { label: 'Weekly', value: '1w' },
              { label: 'Monthly', value: '1m' },
              { label: 'All-time', value: 'at' }
            ]}
            onSelect={onTimeframe}
          />
        )}
      </div>
      <div className="pm-p-profile-your-stats">
        {(() => {
          if (isLoading)
            return (
              <>
                <Skeleton style={{ height: 96 }} />
                <Skeleton style={{ height: 96 }} />
              </>
            );
          if (!data)
            return (
              <AlertMini
                variant="default"
                description="No summary data available."
              />
            );
          return (
            <>
              <ProfileLeaderboardRanks
                ranks={{
                  rankByVolume: data.rank.volume,
                  rankByMarketsCreated: data.rank.marketsCreated,
                  rankByWonPredictions: data.rank.claimWinningsCount,
                  rankByLiquidityAdded: data.rank.tvlLiquidity
                }}
                isLoading={false}
              />
              <ProfilePredictionStatistics
                statistics={{
                  volume: data.volume,
                  marketsCreated: data.marketsCreated,
                  wonPredictions: data.claimWinningsCount,
                  liquidityAdded: data.liquidity
                }}
                ticker={ticker}
                isLoading={false}
              />
            </>
          );
        })()}
      </div>
    </div>
  );
}

export default ProfileYourStats;
