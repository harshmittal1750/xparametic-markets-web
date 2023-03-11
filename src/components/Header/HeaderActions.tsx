import { Fragment, useCallback, useEffect } from 'react';

import cn from 'classnames';
import { Container, useTheme } from 'ui';

import { Button } from 'components/Button';
import ConnectMetamask from 'components/ConnectMetamask';
import Icon from 'components/Icon';
import NetworkSelector from 'components/NetworkSelector';
import WalletInfo from 'components/WalletInfo';

import { useAppSelector, usePortal } from 'hooks';

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
  const handleTheme = useCallback(
    () => theme.device.setMode(theme.device.mode === 'dark' ? 'light' : 'dark'),
    [theme.device]
  );
  const headerActionsComponent = {
    Root: theme.device.type.isDesktop ? Fragment : HeaderActionsWrapper,
    Wrapper: theme.device.type.isDesktop ? 'div' : Container
  };

  console.log(theme.device.mode);

  return (
    <headerActionsComponent.Root>
      <headerActionsComponent.Wrapper
        className={cn(headerActionsClasses.root, {
          [headerClasses.container]: !theme.device.type.isDesktop
        })}
      >
        {theme.device.type.isDesktop && <NetworkSelector responsive />}
        {isLoggedIn ? <WalletInfo /> : <ConnectMetamask />}
        <Button
          variant="ghost"
          color="default"
          aria-label="Switch theme"
          onClick={handleTheme}
          className={headerActionsClasses.theme}
        >
          <Icon
            name={theme.device.mode === 'dark' ? 'Sun' : 'Moon'}
            size="lg"
          />
        </Button>
      </headerActionsComponent.Wrapper>
    </headerActionsComponent.Root>
  );
}
