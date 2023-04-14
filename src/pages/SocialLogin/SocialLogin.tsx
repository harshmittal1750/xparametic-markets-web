/* eslint-disable jsx-a11y/label-has-associated-control */
import { useCallback, useState } from 'react';

import { login } from 'redux/ducks/polkamarkets';
import { Container } from 'ui';

import { Button } from 'components/Button';
import { Text } from 'components/new';

import { useAppDispatch, usePolkamarketsService } from 'hooks';

// import ProfileAchievements from './ProfileAchievements';
// import ProfileActivities from './ProfileActivities';
// import ProfileSummary from './ProfileSummary';
// import ProfileYourStats from './ProfileYourStats';

function SocialLogin() {
  const dispatch = useAppDispatch();
  const polkamarketsService = usePolkamarketsService();

  const [email, setEmail] = useState('');

  const socialLogin = useCallback(
    async provider => {
      // eslint-disable-next-line default-case
      switch (provider) {
        case 'google':
          await polkamarketsService.socialLoginGoogle();
          break;
        case 'facebook':
          await polkamarketsService.socialLoginFacebook();
          break;
        case 'twitter':
          await polkamarketsService.socialLoginTwitter();
          break;
        case 'github':
          await polkamarketsService.socialLoginGithub();
          break;
        case 'discord':
          await polkamarketsService.socialLoginDiscord();
          break;
        case 'email':
          await polkamarketsService.socialLoginEmail(email);
          break;
      }
      dispatch(login(polkamarketsService));
    },
    [dispatch, polkamarketsService, email]
  );

  return (
    <Container className="pm-p-profile">
      <Text as="h2" fontSize="heading-2" fontWeight="semibold" color="1">
        Login
      </Text>
      <Button
        variant="outline"
        color="default"
        size="sm"
        onClick={() => socialLogin('google')}
      >
        Google login
      </Button>
      <Button
        variant="outline"
        color="default"
        size="sm"
        onClick={() => socialLogin('facebook')}
      >
        Facebook login
      </Button>
      <Button
        variant="outline"
        color="default"
        size="sm"
        onClick={() => socialLogin('twitter')}
      >
        Twitter login
      </Button>
      <Button
        variant="outline"
        color="default"
        size="sm"
        onClick={() => socialLogin('github')}
      >
        Github login
      </Button>
      <Button
        variant="outline"
        color="default"
        size="sm"
        onClick={() => socialLogin('discord')}
      >
        Discord login
      </Button>

      <form>
        <div className="pm-c-input__group">
          <label htmlFor="email" className="pm-c-input__label--default">
            Email
          </label>
         <input
            className="pm-c-input--default"
            id="email"
            value={email}
            onChange={e => setEmail(e.target.value)}/>
        </div>
      </form>
      <Button
        variant="outline"
        color="default"
        size="sm"
        onClick={() => socialLogin('email')}
      >
        Email login
      </Button>
      {/* <ProfileSummary address={address} />
      <ProfileYourStats address={address} />
      <div className="pm-p-profile-lists margin-top-6">
        <ProfileAchievements address={address} listHeight={listHeight} />
        <ProfileActivities address={address} listHeight={listHeight} />
      </div> */}
    </Container>
  );
}

export default SocialLogin;
