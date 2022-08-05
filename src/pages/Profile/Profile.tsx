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
    <div className="pm-p-profile">
      <ProfileSummary address={address} />
      <ProfileYourStats address={address} />
      <div className="flex-row gap-5 margin-top-6">
        <ProfileAchievements address={address} />
        <ProfileActivities address={address} />
      </div>
    </div>
  );
}

export default Profile;
