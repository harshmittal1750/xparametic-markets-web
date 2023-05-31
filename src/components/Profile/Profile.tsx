import ProfileSignin from './ProfileSignin';
import ProfileSignout from './ProfileSignout';

type ProfileProps = {
  isLoggedIn: boolean;
};

export default function Profile({ isLoggedIn }: ProfileProps) {
  if (isLoggedIn) return <ProfileSignout />;
  return <ProfileSignin />;
}
