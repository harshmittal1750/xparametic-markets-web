import type { GetPortfolioFeedByAddressData } from 'services/Polkamarkets/types';
import { Skeleton } from 'ui';

import { AlertMini, ScrollableArea } from 'components';

import ProfileActivity from './ProfileActivity';

type ProfileActivitiesProps = {
  listHeight: number;
  data?: GetPortfolioFeedByAddressData;
  isLoading: boolean;
};

export default function ProfileActivities({
  isLoading,
  listHeight,
  data
}: ProfileActivitiesProps) {
  return (
    <div className="flex-column gap-4 width-full">
      <h2 className="text-heading-2 font-semibold text-1">Activity</h2>
      <div className="border-radius-small border-solid border-1">
        {(() => {
          if (isLoading) return <Skeleton style={{ height: 320 }} />;
          if (!data?.length)
            return (
              <AlertMini
                variant="default"
                description="No activities available."
              />
            );
          return (
            <ScrollableArea
              className="flex-column"
              scrollbarSize="sm"
              style={{ height: listHeight }}
              fullwidth
            >
              {data?.map((activity, index) => (
                <ProfileActivity
                  key={activity.timestamp}
                  activity={activity}
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
