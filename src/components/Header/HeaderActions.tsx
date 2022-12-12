import classNames from 'classnames';
import { Container } from 'ui';

import { Button } from 'components/Button';
import ConnectMetamask from 'components/ConnectMetamask';
import Icon from 'components/Icon';
import WalletInfo from 'components/WalletInfo';

import { useTheme, useAppSelector } from 'hooks';

import HeaderClasses from './Header.module.scss';

export default function HeaderActions({ isDesktop }: { isDesktop: boolean }) {
  const isLoggedIn = useAppSelector(state => state.polkamarkets.isLoggedIn);
  const theme = useTheme();
  const isThemeDark = theme.theme === 'dark';
  const themeAnti = isThemeDark ? 'light' : 'dark';
  const RootComponent = isDesktop ? 'div' : Container;

  function handleTheme() {
    theme.setTheme(themeAnti);
  }

  return (
    <RootComponent
      className={classNames(HeaderClasses.actions, {
        [HeaderClasses.container]: !isDesktop
      })}
    >
      {isLoggedIn ? <WalletInfo /> : <ConnectMetamask />}
      <Button
        variant="outline"
        color="default"
        aria-label="Switch theme"
        onClick={handleTheme}
      >
        <Icon name="Gear" />
      </Button>
    </RootComponent>
  );
}
