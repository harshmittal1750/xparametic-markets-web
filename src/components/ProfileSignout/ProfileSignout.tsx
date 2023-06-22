import { useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { formatNumberToString } from 'helpers/math';
import shortenAddress from 'helpers/shortenAddress';
import { Avatar } from 'ui';

import { Button } from 'components/Button';
import Icon from 'components/Icon';
import Text from 'components/Text';

import {
  useAppDispatch,
  useAppSelector,
  useFantasyTokenTicker,
  usePolkamarketsService
} from 'hooks';

import profileSignoutClasses from './ProfileSignout.module.scss';

export default function ProfileSignout() {
  const dispatch = useAppDispatch();
  const fantasyTokenTicker = useFantasyTokenTicker();
  const polkamarketsService = usePolkamarketsService();
  const polkBalance = useAppSelector(state => state.polkamarkets.polkBalance);
  const ethAddress = useAppSelector(state => state.polkamarkets.ethAddress);
  const socialLoginInfo = useAppSelector(
    state => state.polkamarkets.socialLoginInfo
  );
  const handleSocialLogout = useCallback(async () => {
    const { logout } = await import('redux/ducks/polkamarkets');

    polkamarketsService.logoutSocialLogin();
    dispatch(logout());
  }, [dispatch, polkamarketsService]);
  const username =
    socialLoginInfo?.name.split('#')[0] || shortenAddress(ethAddress);

  useEffect(() => {
    async function handleDiscordLogin() {
      const { updateSocialLoginInfo } = await import(
        'services/Polkamarkets/user'
      );

      // send data to backend
      await updateSocialLoginInfo(
        socialLoginInfo.idToken,
        socialLoginInfo.typeOfLogin,
        ethAddress,
        socialLoginInfo.profileImage,
        socialLoginInfo.oAuthAccessToken
      );
    }

    if (socialLoginInfo?.typeOfLogin === 'discord') handleDiscordLogin();
  }, [socialLoginInfo, ethAddress]);

  return (
    <div className={profileSignoutClasses.root}>
      <Button
        variant="ghost"
        color="default"
        size="sm"
        onClick={handleSocialLogout}
        className={profileSignoutClasses.signout}
      >
        <Icon
          name="LogOut"
          size="lg"
          className={profileSignoutClasses.signoutIcon}
        />
        Sign Out
      </Button>
      <div className="pm-c-wallet-info__profile">
        <Link to={`/user/${ethAddress}`}>
          <Avatar
            $size="sm"
            $radius="lg"
            src={socialLoginInfo?.profileImage}
            alt={username || 'avatar'}
          />
        </Link>
        <div>
          <Text
            scale="caption"
            fontWeight="semibold"
            className={profileSignoutClasses.username}
          >
            {username}
          </Text>
          <Text
            scale="tiny-uppercase"
            fontWeight="semibold"
            className="pm-c-wallet-info__profile__ticker"
          >
            {formatNumberToString(polkBalance)} {fantasyTokenTicker || 'POLK'}
          </Text>
        </div>
      </div>
    </div>
  );
}
