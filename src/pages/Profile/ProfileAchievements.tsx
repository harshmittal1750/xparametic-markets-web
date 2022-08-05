import { useGetLeaderboardByAddressQuery } from 'services/Polkamarkets';

import { ScrollableArea } from 'components';
import { Text } from 'components/new';

import { useNetwork } from 'hooks';

import ProfileAchievement from './ProfileAchievement';

type ProfileAchievementsProps = {
  address: string;
};

function ProfileAchievements({ address }: ProfileAchievementsProps) {
  const { network } = useNetwork();

  const { data: leaderboard, isLoading } = useGetLeaderboardByAddressQuery({
    address,
    timeframe: 'at',
    networkId: network.id
  });

  if (isLoading || !leaderboard) return null;

  const { achievements } = leaderboard;

  return (
    <div className="flex-column gap-4 width-full">
      <Text as="h2" fontSize="heading-2" fontWeight="semibold" color="1">
        Achievements
      </Text>
      <div className="border-radius-small border-solid border-1">
        <ScrollableArea
          className="flex-column"
          scrollbarSize="sm"
          style={{ height: 456 }}
          fullwidth
        >
          {achievements.map((achievement, index) => (
            <ProfileAchievement
              key={achievement.id}
              achievement={achievement}
              backgroundColor={index % 2 === 0 ? '2' : '3'}
            />
          ))}
        </ScrollableArea>
      </div>
    </div>
  );
}

export default ProfileAchievements;
