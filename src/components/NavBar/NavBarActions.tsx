import { formatNumberToString } from 'helpers/math';

import { EthereumIcon, PolkamarketsIconSmall, SunIcon } from 'assets/icons';

import { Button } from 'components/Button';
import ConnectMetamask from 'components/ConnectMetamask';
import WalletInfo from 'components/WalletInfo';

import { useAppSelector, useNetwork } from 'hooks';

function NavBarActions() {
  const { network } = useNetwork();

  const walletConnected = useAppSelector(
    state => state.polkamarkets.isLoggedIn
  );
  const ethBalance = useAppSelector(state => state.polkamarkets.ethBalance);
  const polkBalance = useAppSelector(state => state.polkamarkets.polkBalance);
  const walletAddress = useAppSelector(state => state.polkamarkets.ethAddress);

  return (
    <div className="pm-l-navbar__actions">
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
        <ConnectMetamask />
      )}
      <Button variant="outline" color="default">
        <SunIcon />
      </Button>
      <Button variant="outline" color="default">
        <EthereumIcon />
      </Button>
    </div>
  );
}

export default NavBarActions;
