import { EthereumIcon } from 'assets/icons';

import { Button } from 'components/Button';
import ConnectMetamask from 'components/ConnectMetamask';
import Icon from 'components/Icon';
import WalletInfo from 'components/WalletInfo';

import { useAppSelector, useTheme } from 'hooks';

function NavBarActions() {
  const theme = useTheme();
  const isLoggedIn = useAppSelector(state => state.polkamarkets.isLoggedIn);
  const isThemeDark = theme.theme === 'dark';
  const themeAnti = isThemeDark ? 'light' : 'dark';

  function handleClickTheme() {
    theme.setTheme(themeAnti);
  }

  return (
    <div className="pm-l-layout__header__actions">
      {isLoggedIn ? <WalletInfo /> : <ConnectMetamask />}
      <Button
        variant="outline"
        color="default"
        aria-label={`Switch to ${isThemeDark ? 'light' : 'dark'} theme`}
        onClick={handleClickTheme}
      >
        <Icon name={isThemeDark ? 'Sun' : 'Moon'} />
      </Button>
      <Button variant="outline" color="default">
        <EthereumIcon />
      </Button>
    </div>
  );
}

export default NavBarActions;
