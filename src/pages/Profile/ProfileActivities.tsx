import isEmpty from 'lodash/isEmpty';
import { useGetPortfolioFeedByAddressQuery } from 'services/Polkamarkets';
import { Skeleton } from 'ui';

import { ScrollableArea } from 'components';

import { useNetwork } from 'hooks';

import ProfileActivity from './ProfileActivity';

type ProfileActivitiesProps = {
  address: string;
  listHeight: number;
};

function ProfileActivities({ address, listHeight }: ProfileActivitiesProps) {
  const network = useNetwork();
  const feed = useGetPortfolioFeedByAddressQuery({
    address,
    networkId: network.network.id
  });

  if (feed.isLoading)
    return (
      <div className="flex-column gap-4 width-full">
        <h2 className="text-heading-2 font-semibold text-1">Activity</h2>
        <div className="border-radius-small border-solid border-1">
          <Skeleton style={{ height: 320 }} />
        </div>
      </div>
    );

  if (isEmpty(feed.data)) return null;

  return (
    <div className="flex-column gap-4 width-full">
      <h2 className="text-heading-2 font-semibold text-1">Activity</h2>
      <div className="border-radius-small border-solid border-1">
        <ScrollableArea
          className="flex-column"
          scrollbarSize="sm"
          style={{ height: listHeight }}
          fullwidth
        >
          {feed.data?.map((activity, index) => (
            <ProfileActivity
              key={activity.timestamp}
              activity={activity}
              backgroundColor={index % 2 === 0 ? '2' : '3'}
            />
          ))}
        </ScrollableArea>
      </div>
    </div>
  );
}

export default ProfileActivities;
