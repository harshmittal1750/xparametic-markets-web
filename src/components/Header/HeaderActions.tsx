import { Fragment, useEffect } from 'react';

import cn from 'classnames';
import { Container, useMedia } from 'ui';

import { Button } from 'components/Button';
import ConnectMetamask from 'components/ConnectMetamask';
import Icon from 'components/Icon';
import NetworkSelector from 'components/NetworkSelector';
import WalletInfo from 'components/WalletInfo';

import { useTheme, useAppSelector, usePortal } from 'hooks';

import headerClasses from './Header.module.scss';
import headerActionsClasses from './HeaderActions.module.scss';

function HeaderActionsWrapper(props: React.PropsWithChildren<{}>) {
  const Portal = usePortal({
    root: document.body
  });

  useEffect(() => {
    Portal.mount(true);
  }, [Portal]);

  return <Portal {...props} />;
}
export default function HeaderActions() {
  const isLoggedIn = useAppSelector(state => state.polkamarkets.isLoggedIn);
  const theme = useTheme();
  const isDesktop = useMedia('(min-width: 1024px)');
  const isThemeDark = theme.theme === 'dark';
  const headerActionsComponent = {
    Root: isDesktop ? Fragment : HeaderActionsWrapper,
    Wrapper: isDesktop ? 'div' : Container
  };

  function handleTheme() {
    theme.setTheme(isThemeDark ? 'light' : 'dark');
  }

  return (
    <headerActionsComponent.Root>
      <headerActionsComponent.Wrapper
        className={cn(headerActionsClasses.root, {
          [headerClasses.container]: !isDesktop
        })}
      >
        {isDesktop && <NetworkSelector responsive />}
        {isLoggedIn ? <WalletInfo /> : <ConnectMetamask />}
        <Button
          variant="ghost"
          color="default"
          aria-label="Switch theme"
          onClick={handleTheme}
          className={headerActionsClasses.theme}
        >
          <Icon name={isThemeDark ? 'Sun' : 'Moon'} size="lg" />
        </Button>
      </headerActionsComponent.Wrapper>
    </headerActionsComponent.Root>
  );
}
