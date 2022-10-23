import { EthereumIcon, MoonIcon, SunIcon } from 'assets/icons';

import { Button } from 'components/Button';
import ConnectMetamask from 'components/ConnectMetamask';
import WalletInfo from 'components/WalletInfo';

import { useAppSelector, useTheme } from 'hooks';

function NavBarActions() {
  const theme = useTheme();
  const appState = useAppSelector(state => state);
  const isThemeDark = theme.theme === 'dark';
  const themeAnti = isThemeDark ? 'light' : 'dark';

  function handleClickTheme() {
    theme.setTheme(themeAnti);
  }

  return (
    <div className="pm-l-layout__header__actions">
      {appState.polkamarkets.isLoggedIn ? <WalletInfo /> : <ConnectMetamask />}
      <Button
        variant="outline"
        color="default"
        aria-label={`Switch to ${isThemeDark ? 'light' : 'dark'} theme`}
        onClick={handleClickTheme}
      >
        {isThemeDark ? <SunIcon /> : <MoonIcon />}
      </Button>
      <Button variant="outline" color="default">
        <EthereumIcon />
      </Button>
    </div>
  );
}

export default NavBarActions;
