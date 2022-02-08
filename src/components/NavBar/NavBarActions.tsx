import { useEffect } from 'react';

import { formatNumberToString } from 'helpers/math';
import { login } from 'redux/ducks/bepro';
import { BeproService } from 'services';

import { MetaMaskIconSmall, PolkamarketsIconSmall } from 'assets/icons';

import { useAppDispatch, useAppSelector, useNetwork } from 'hooks';
import useAlertNotification from 'hooks/useAlertNotification';

import { AlertInline } from '../Alert';
import { Button } from '../Button';
import Link from '../Link';
import Networks from '../Networks';
import WalletInfo from '../WalletInfo';

function NavBarActions() {
  const { show } = useAlertNotification();
  const dispatch = useAppDispatch();
  const { network, networkConfig } = useNetwork();

  const beproService = new BeproService(networkConfig);

  const walletConnected = useAppSelector(state => state.bepro.isLoggedIn);
  const ethBalance = useAppSelector(state => state.bepro.ethBalance);
  const polkBalance = useAppSelector(state => state.bepro.polkBalance);
  const walletAddress = useAppSelector(state => state.bepro.ethAddress);

  // Example
  useEffect(() => {
    show('beta-testing');
  }, [show, walletConnected]);

  const handleConnectWallet = async () => {
    await beproService.login();
    await dispatch(login(networkConfig));
  };

  return (
    <div className="pm-l-navbar__actions">
      <AlertInline
        id="beta-testing"
        variant="warning"
        description={
          <>
            {`Welcome to Polkamarkets! You’re on ${network.name} and placing predictions with ${network.currency.ticker}. Your `}
            <Link
              title="feedback"
              target="_blank"
              href="//discord.gg/Szjn2EEf7w"
              rel="noreferrer"
              variant="warning"
            />
            {` is highly appreciated 🎉`}
          </>
        }
      />
      {network && network.key !== 'unknown' ? <Networks /> : null}
      {walletConnected ? (
        <WalletInfo
          wallets={[
            {
              id: network.currency.name,
              balance: ethBalance.toFixed(4),
              currencyIcon: network.currency.icon
            },
            {
              id: 'polk',
              balance: formatNumberToString(polkBalance),
              currencyIcon: <PolkamarketsIconSmall />
            }
          ]}
          address={walletAddress}
        />
      ) : (
        <Button
          variant="outline"
          color="default"
          size="sm"
          aria-label="Connect MetaMask"
          onClick={handleConnectWallet}
        >
          <MetaMaskIconSmall />
          Connect MetaMask
        </Button>
      )}
    </div>
  );
}

export default NavBarActions;
