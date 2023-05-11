import { Fragment, useCallback } from 'react';
import { Link } from 'react-router-dom';

import cn from 'classnames';
import { features } from 'config';
import { formatNumberToString } from 'helpers/math';
import shortenAddress from 'helpers/shortenAddress';
import { useTheme } from 'ui';

import { MetaMaskIcon as MetaMaskIconUI } from 'assets/icons';

import { Button } from 'components/Button';
import Feature from 'components/Feature';
import Icon from 'components/Icon';

import {
  useAppDispatch,
  useAppSelector,
  useNetwork,
  usePolkamarketsService,
  useFantasyTokenTicker
} from 'hooks';

import { logout } from '../../redux/ducks/polkamarkets';
import { Transak } from '../integrations';
import WalletInfoClaim from './WalletInfoClaim';

function MetaMaskIcon() {
  return (
    <span style={{ marginRight: 4, display: 'flex' }}>
      <MetaMaskIconUI />
    </span>
  );
}
function MetaMaskWallet(props: React.PropsWithChildren<{}>) {
  return (
    <div
      className={cn({
        'pm-c-wallet-info__currency': features.regular.enabled,
        'pm-c-wallet-info__currency--no-border': features.fantasy.enabled
      })}
      {...props}
    />
  );
}
export default function WalletInfo() {
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const { network } = useNetwork();
  const fantasyTokenTicker = useFantasyTokenTicker();
  const polkBalance = useAppSelector(state => state.polkamarkets.polkBalance);
  const ethBalance = useAppSelector(state => state.polkamarkets.ethBalance);
  const ethAddress = useAppSelector(state => state.polkamarkets.ethAddress);
  const MetaMaskWalletComponent = theme.device.isDesktop
    ? MetaMaskWallet
    : Fragment;

  const polkamarketsService = usePolkamarketsService();

  const handleSocialLoginLogout = useCallback(async () => {
    await polkamarketsService.logoutSocialLogin();
    dispatch(logout());
  }, [dispatch, polkamarketsService]);

  return (
    <div className="pm-c-wallet-info">
      <div className="pm-c-wallet-info__currency pm-c-wallet-info__profile">
        {formatNumberToString(polkBalance)}
        <span className="pm-c-wallet-info__currency__ticker">
          {fantasyTokenTicker || 'POLK'}
        </span>
        {theme.device.isDesktop && (
          <>
            <Feature name="fantasy">
              <WalletInfoClaim />
            </Feature>
            {network.buyEc20Url && (
              <Feature name="regular">
                <Button
                  className="pm-c-button-normal--primary pm-c-button--sm pm-c-wallet-info__currency__button pm-c-wallet-info__currency__buy"
                  style={{ padding: '0.5rem 1rem' }}
                  onClick={() => window.open(network.buyEc20Url, '_blank')}
                >
                  Buy {theme.device.isDesktop && '$POLK'}
                </Button>
              </Feature>
            )}
          </>
        )}
      </div>
      <MetaMaskWalletComponent>
        {theme.device.isDesktop && (
          <Feature name="regular">
            <>
              <MetaMaskIcon />
              {ethBalance.toFixed(4)}
              <span className="pm-c-wallet-info__currency__ticker">
                {' '}
                {network.currency.ticker}
              </span>
            </>
          </Feature>
        )}
        <Link
          to={`/user/${ethAddress}`}
          className={cn(
            'pm-c-button-subtle--default pm-c-button--sm pm-c-wallet-info__currency__address',
            {
              'pm-c-wallet-info__currency__button': theme.device.isDesktop
            }
          )}
        >
          <Feature name="regular">
            <>
              {!theme.device.isDesktop && <MetaMaskIcon />}
              {shortenAddress(ethAddress)}
            </>
          </Feature>
          <Feature name="fantasy">
            <>
              <Icon name="User" />
              Profile
            </>
          </Feature>
        </Link>
        {theme.device.isDesktop && <Transak />}
      </MetaMaskWalletComponent>
      <Button
        variant="outline"
        color="default"
        size="sm"
        onClick={handleSocialLoginLogout}
      >
        Logout
      </Button>
    </div>
  );
}
