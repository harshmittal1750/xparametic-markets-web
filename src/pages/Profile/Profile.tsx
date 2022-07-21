import ProfileAchievements from './ProfileAchievements';
import ProfileActivities from './ProfileActivities';
import ProfileSummary from './ProfileSummary';
import ProfileYourStats from './ProfileYourStats';

function Profile() {
  return (
    <div className="flex-column gap-5">
      <ProfileSummary />
      <ProfileYourStats />
      <div className="flex-row gap-5 margin-top-6">
        <ProfileAchievements />
        <ProfileActivities />
      </div>
    </div>
  );
}

export default Profile;
