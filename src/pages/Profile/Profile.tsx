import { useParams } from 'react-router-dom';

import ProfileAchievements from './ProfileAchievements';
import ProfileActivities from './ProfileActivities';
import ProfileSummary from './ProfileSummary';
import ProfileYourStats from './ProfileYourStats';

type ProfileUrlParams = {
  address: string;
};

function Profile() {
  const { address } = useParams<ProfileUrlParams>();

  return (
    <div className="flex-column gap-5">
      <ProfileSummary address={address} />
      <ProfileYourStats address={address} />
      <div className="flex-row gap-5 margin-top-6">
        <ProfileAchievements />
        <ProfileActivities />
      </div>
    </div>
  );
}

export default Profile;
