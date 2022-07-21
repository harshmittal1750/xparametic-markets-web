import ProfileAchievements from './ProfileAchievements';
import ProfileSummary from './ProfileSummary';
import ProfileYourStats from './ProfileYourStats';

function Profile() {
  return (
    <div className="flex-column gap-5">
      <ProfileSummary />
      <ProfileYourStats />
      <div className="flex-row gap-5">
        <ProfileAchievements />
      </div>
    </div>
  );
}

export default Profile;
