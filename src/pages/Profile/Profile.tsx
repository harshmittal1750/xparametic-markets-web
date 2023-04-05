import { useParams } from 'react-router-dom';

import { Container } from 'ui';

import ProfileAchievements from './ProfileAchievements';
import ProfileActivities from './ProfileActivities';
import ProfileSummary from './ProfileSummary';
import ProfileYourStats from './ProfileYourStats';

type ProfileUrlParams = {
  address: string;
};

export default function Profile() {
  const { address } = useParams<ProfileUrlParams>();
  const listHeight = Math.min(Math.ceil(window.innerHeight * 0.5), 700);

  return (
    <Container className="pm-p-profile">
      <ProfileSummary address={address} />
      <ProfileYourStats address={address} />
      <div className="pm-p-profile-lists margin-top-6">
        <ProfileAchievements address={address} listHeight={listHeight} />
        <ProfileActivities address={address} listHeight={listHeight} />
      </div>
    </Container>
  );
}
