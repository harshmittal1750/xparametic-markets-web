import { EthereumIcon, SunIcon } from 'assets/icons';

import { Button } from 'components/Button';
import ConnectMetamask from 'components/ConnectMetamask';
import WalletInfo from 'components/WalletInfo';

import { useAppSelector } from 'hooks';

function NavBarActions() {
  const walletConnected = useAppSelector(
    state => state.polkamarkets.isLoggedIn
  );

  return (
    <div className="pm-l-layout__header__actions">
      {walletConnected ? <WalletInfo /> : <ConnectMetamask />}
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
