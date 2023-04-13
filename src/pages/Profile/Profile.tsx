import { useState } from 'react';
import { useParams } from 'react-router-dom';

import {
  useGetLeaderboardByAddressQuery,
  useGetPortfolioByAddressQuery
} from 'services/Polkamarkets';
import type { LeaderboardTimeframe } from 'types/leaderboard';
import { Container } from 'ui';

import { useNetwork } from 'hooks';

import ProfileAchievements from './ProfileAchievements';
import ProfileActivities from './ProfileActivities';
import ProfileSummary from './ProfileSummary';
import ProfileSummaryStat from './ProfileSummaryStat';
import ProfileYourStats from './ProfileYourStats';

type ProfileUrlParams = {
  address: string;
};

export default function Profile() {
  const [timeframe, setTimeframe] = useState<LeaderboardTimeframe>('at');
  const { address } = useParams<ProfileUrlParams>();
  const { network } = useNetwork();
  const portfolio = useGetPortfolioByAddressQuery({
    address,
    networkId: network.id
  });
  const leaderboard = useGetLeaderboardByAddressQuery({
    address,
    networkId: network.id,
    timeframe
  });
  const ticker = network.currency.symbol || network.currency.ticker;
  const props = {
    address,
    listHeight: Math.min(Math.ceil(window.innerHeight * 0.5), 700)
  };

  return (
    <Container className="pm-p-profile">
      <div className="pm-p-profile-summary">
        <ProfileSummary
          address={address}
          data={portfolio.data}
          isLoading={portfolio.isLoading}
          network={network}
        />
        <ProfileSummaryStat
          isLoading={portfolio.isLoading}
          ticker={ticker}
          data={portfolio.data}
        />
      </div>
      <ProfileYourStats
        onTimeframe={setTimeframe}
        isLoading={leaderboard.isLoading}
        ticker={ticker}
        data={leaderboard.data}
      />
      <div className="pm-p-profile-lists margin-top-6">
        <ProfileAchievements {...props} />
        <ProfileActivities {...props} />
      </div>
    </Container>
  );
}
