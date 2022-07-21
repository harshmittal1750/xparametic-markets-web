import { ScrollableArea } from 'components';

import ProfileActivity from './ProfileActivity';

function ProfileActivities() {
  return (
    <div className="flex-column gap-4 width-full">
      <h2 className="text-heading-2 font-semibold text-1">Activity</h2>
      <div className="border-radius-small border-solid border-1">
        <ScrollableArea
          className="flex-column"
          scrollbarSize="sm"
          style={{ height: 456 }}
          fullwidth
        >
          <ProfileActivity result="won" />
          <ProfileActivity result="lost" />
          <ProfileActivity result="won" />
          <ProfileActivity result="lost" />
          <ProfileActivity result="won" />
          <ProfileActivity result="lost" />
          <ProfileActivity result="won" />
          <ProfileActivity result="lost" />
        </ScrollableArea>
      </div>
    </div>
  );
}

export default ProfileActivities;
