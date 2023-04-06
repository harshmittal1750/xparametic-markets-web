import { isEmpty } from 'lodash';
import { useGetLeaderboardByAddressQuery } from 'services/Polkamarkets';
import { Skeleton } from 'ui';

import { ScrollableArea } from 'components';
import { Text } from 'components/new';

import { useNetwork } from 'hooks';

import ProfileAchievement from './ProfileAchievement';

type ProfileAchievementsProps = {
  address: string;
  listHeight: number;
};

function ProfileAchievements({
  address,
  listHeight
}: ProfileAchievementsProps) {
  const network = useNetwork();
  const leaderboard = useGetLeaderboardByAddressQuery({
    address,
    timeframe: 'at',
    networkId: network.network.id
  });

  if (leaderboard.isLoading)
    return (
      <div className="flex-column gap-4 width-full">
        <Text as="h2" fontSize="heading-2" fontWeight="semibold" color="1">
          Achievements
        </Text>
        <div className="border-radius-small border-solid border-1">
          <Skeleton style={{ height: 320 }} />
        </div>
      </div>
    );

  if (!leaderboard.data?.achievements.length) return null;

  return (
    <div className="flex-column gap-4 width-full">
      <Text as="h2" fontSize="heading-2" fontWeight="semibold" color="1">
        Achievements
      </Text>
      <div className="border-radius-small border-solid border-1">
        <ScrollableArea
          className="flex-column"
          scrollbarSize="sm"
          style={{ height: listHeight }}
          fullwidth
        >
          {leaderboard.data.achievements.map((achievement, index) => (
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
