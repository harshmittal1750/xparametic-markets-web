import { Fragment, useEffect } from 'react';

import cn from 'classnames';
import { features, ui } from 'config';
import { Container, useTheme } from 'ui';

import NetworkSelector from 'components/NetworkSelector';
import Profile from 'components/Profile';
import ThemeSelector from 'components/ThemeSelector';
import Wallet from 'components/Wallet';

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
  const { isDesktop } = useTheme().device;
  const Root = isDesktop ? Fragment : HeaderActionsWrapper;
  const Wrapper = isDesktop ? 'div' : Container;
  const HeaderActionsIntegration = features.fantasy.enabled ? Profile : Wallet;

  return (
    <Root>
      <Wrapper
        className={cn(headerActionsClasses.root, {
          [headerClasses.container]: !isDesktop
        })}
      >
        <ThemeSelector />
        {ui.layout.header.networkSelector.enabled && isDesktop && (
          <NetworkSelector
            size="sm"
            responsive
            className={headerActionsClasses.network}
          />
        )}
        <HeaderActionsIntegration isLoggedIn={isLoggedIn} />
      </Wrapper>
    </Root>
  );
}
