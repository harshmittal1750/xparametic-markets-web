import { EthereumIcon, MoonIcon, SunIcon } from 'assets/icons';

import { Button } from 'components/Button';
import ConnectMetamask from 'components/ConnectMetamask';
import WalletInfo from 'components/WalletInfo';

import { useAppSelector, useTheme } from 'hooks';

function NavBarActions() {
  const theme = useTheme();
  const walletConnected = useAppSelector(
    state => state.polkamarkets.isLoggedIn
  );
  const themeIcon = theme.theme === 'dark' ? <SunIcon /> : <MoonIcon />;
  const themeAnti = theme.theme === 'dark' ? 'light' : 'dark';

  function handleClickTheme() {
    theme.setTheme(themeAnti);
  }

  return (
    <div className="pm-l-layout__header__actions">
      {walletConnected ? <WalletInfo /> : <ConnectMetamask />}
      <Button
        variant="outline"
        color="default"
        aria-label={`Switch to ${themeAnti} theme`}
        onClick={handleClickTheme}
      >
        {themeIcon}
      </Button>
      <Button variant="outline" color="default">
        <EthereumIcon />
      </Button>
    </div>
  );
}

export default NavBarActions;
