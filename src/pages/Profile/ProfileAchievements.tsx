import type { GetLeaderboardByAddressData } from 'services/Polkamarkets/types';
import { Skeleton } from 'ui';

import { AlertMini, ScrollableArea } from 'components';
import { Text } from 'components/new';

import ProfileAchievement from './ProfileAchievement';

type ProfileAchievementsProps = {
  listHeight: number;
  data?: GetLeaderboardByAddressData;
  isLoading: boolean;
};

export default function ProfileAchievements({
  listHeight,
  data,
  isLoading
}: ProfileAchievementsProps) {
  return (
    <div className="flex-column gap-4 width-full">
      <Text as="h2" fontSize="heading-2" fontWeight="semibold" color="1">
        Achievements
      </Text>
      <div className="border-radius-small border-solid border-1">
        {(() => {
          if (isLoading) return <Skeleton style={{ height: 320 }} />;
          if (!data?.achievements.length)
            return (
              <AlertMini
                variant="default"
                description="No achievements available."
              />
            );
          return (
            <ScrollableArea
              className="flex-column"
              scrollbarSize="sm"
              style={{ height: listHeight }}
              fullwidth
            >
              {data.achievements.map((achievement, index) => (
                <ProfileAchievement
                  key={achievement.id}
                  achievement={achievement}
                  backgroundColor={index % 2 === 0 ? '2' : '3'}
                />
              ))}
            </ScrollableArea>
          );
        })()}
      </div>
    </div>
  );
}
