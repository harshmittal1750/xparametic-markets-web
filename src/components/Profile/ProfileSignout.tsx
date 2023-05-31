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

import profileSignoutClasses from './Profile.module.scss';

const user = {
  src: '',
  name: 'User Name'
};

export default function ProfileSignout() {
  const dispatch = useAppDispatch();
  const fantasyTokenTicker = useFantasyTokenTicker();
  const polkBalance = useAppSelector(state => state.polkamarkets.polkBalance);
  const ethAddress = useAppSelector(state => state.polkamarkets.ethAddress);
  const userInfo = useAppSelector(state => state.polkamarkets.socialLoginInfo);
  const polkamarketsService = usePolkamarketsService();
  const handleSocialLogout = useCallback(async () => {
    const { logout } = await import('redux/ducks/polkamarkets');

    polkamarketsService.logoutSocialLogin();
    dispatch(logout());
  }, [dispatch, polkamarketsService]);

  useEffect(() => {
    async function handleDiscordLogin() {
      const { updateSocialLoginInfo } = await import(
        'services/Polkamarkets/user'
      );
      const { PolkamarketsService } = await import('services');
      const discordUsernameAndServer =
        await PolkamarketsService.getDiscordUsernameAndServer(userInfo);

      // send data to backend
      updateSocialLoginInfo(
        userInfo.idToken,
        discordUsernameAndServer.username,
        userInfo.typeOfLogin,
        ethAddress,
        userInfo.profileImage,
        discordUsernameAndServer.servers.map((server: any) => ({
          id: server.id,
          name: server.name
        }))
      );
    }

    if (userInfo?.typeOfLogin === 'discord') handleDiscordLogin();
  }, [userInfo, ethAddress]);

  return (
    <div className={profileSignoutClasses.signout}>
      <Button
        variant="ghost"
        color="default"
        size="sm"
        onClick={handleSocialLogout}
        className={profileSignoutClasses.signoutButton}
      >
        <Icon
          name="LogOut"
          size="lg"
          style={{ fill: 'var(--color-text-secondary)' }}
        />
        Sign Out
      </Button>
      <div className="pm-c-wallet-info__profile">
        <Link to={`/user/${ethAddress}`}>
          <Avatar
            $size="sm"
            $radius="lg"
            src=""
            alt={user.name.toUpperCase()}
          />
        </Link>
        <div>
          <Text
            scale="caption"
            fontWeight="semibold"
            style={{ color: 'var(--color-text-primary)' }}
          >
            {user.name || shortenAddress(ethAddress)}
          </Text>
          <Text
            scale="tiny-uppercase"
            fontWeight="semibold"
            className="pm-c-wallet-info__profile__ticker"
          >
            {formatNumberToString(polkBalance)} {fantasyTokenTicker || 'POLK'}
            <Icon
              name="PlusOutlined"
              className="pm-c-wallet-info__profile__ticker_icon"
            />
          </Text>
        </div>
      </div>
    </div>
  );
}
