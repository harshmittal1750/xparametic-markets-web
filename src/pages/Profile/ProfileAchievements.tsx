import { ScrollableArea } from 'components';

import ProfileAchievement from './ProfileAchievement';

function ProfileAchievements() {
  return (
    <div className="flex-column gap-4 width-full">
      <h2 className="text-heading-2 font-semibold text-1">Achievements</h2>
      <div className="border-radius-small border-solid border-1">
        <ScrollableArea
          className="flex-column"
          scrollbarSize="sm"
          style={{ height: 456 }}
        >
          <ProfileAchievement backgroundColor="2" />
          <ProfileAchievement backgroundColor="3" />
          <ProfileAchievement backgroundColor="2" />
          <ProfileAchievement backgroundColor="3" />
          <ProfileAchievement backgroundColor="2" />
          <ProfileAchievement backgroundColor="3" />
          <ProfileAchievement backgroundColor="2" />
        </ScrollableArea>
      </div>
    </div>
  );
}

export default ProfileAchievements;
