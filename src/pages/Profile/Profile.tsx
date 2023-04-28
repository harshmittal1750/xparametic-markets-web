import { useState } from 'react';
import { useParams } from 'react-router-dom';

import {
  useGetLeaderboardByAddressQuery,
  useGetPortfolioByAddressQuery,
  useGetPortfolioFeedByAddressQuery
} from 'services/Polkamarkets';
import type { LeaderboardTimeframe } from 'types/leaderboard';
import { Container } from 'ui';

import { useNetwork } from 'hooks';

import ProfileAchievements from './ProfileAchievements';
import ProfileActivities from './ProfileActivities';
import ProfileError from './ProfileError';
import ProfileSummary from './ProfileSummary';
import ProfileSummaryStat from './ProfileSummaryStat';
import ProfileYourStats from './ProfileYourStats';

const LIST_HEIGHT = Math.min(Math.ceil(window.innerHeight * 0.5), 700);

export default function Profile() {
  const [timeframe, setTimeframe] = useState<LeaderboardTimeframe>('at');
  const { address } = useParams<Record<'address', string>>();
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
  const activity = useGetPortfolioFeedByAddressQuery({
    address,
    networkId: network.id
  });

  const hasError = portfolio.isError || leaderboard.isError || activity.isError;

  return (
    <Container className="pm-p-profile">
      {hasError ? (
        <ProfileError />
      ) : (
        <>
          <div className="pm-p-profile-summary">
            <ProfileSummary
              address={address}
              data={portfolio.data}
              isLoading={portfolio.isLoading}
              network={network}
            />
            <ProfileSummaryStat
              isLoading={portfolio.isLoading}
              ticker="€"
              data={portfolio.data}
            />
          </div>
          <ProfileYourStats
            onTimeframe={setTimeframe}
            isLoading={leaderboard.isLoading}
            ticker="€"
            data={leaderboard.data}
          />
          <div className="pm-p-profile-lists margin-top-6">
            <ProfileAchievements
              listHeight={LIST_HEIGHT}
              isLoading={leaderboard.isLoading}
              data={leaderboard.data}
            />
            <ProfileActivities
              isLoading={activity.isLoading}
              listHeight={LIST_HEIGHT}
              data={activity.data}
            />
          </div>
        </>
      )}
    </Container>
  );
}
