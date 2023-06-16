import { Fragment, useEffect } from 'react';

import cn from 'classnames';
import { features, ui } from 'config';
import { Container, Skeleton, useTheme } from 'ui';

import NetworkSelector from 'components/NetworkSelector';
import Profile from 'components/Profile';
import ThemeSelector from 'components/ThemeSelector';
import Wallet from 'components/Wallet';

import { useAppSelector, usePortal } from 'hooks';

import headerClasses from './Header.module.scss';
import headerActionsClasses from './HeaderActions.module.scss';

function HeaderActionsWrapper(
  props: React.PropsWithChildren<Record<string, unknown>>
) {
  const Portal = usePortal({
    root: document.body
  });

  useEffect(() => {
    Portal.mount(true);
  }, [Portal]);

  return <Portal {...props} />;
}
function HeaderActionsGroup(
  props: React.PropsWithChildren<Record<string, unknown>>
) {
  return <div className={headerActionsClasses.actionsGroup} {...props} />;
}
function SkeletonWallet() {
  return (
    <div style={{ display: 'inherit', alignItems: 'center', gap: 'inherit' }}>
      <Skeleton style={{ height: 44, width: 72 }} />
      <Skeleton style={{ height: 44, width: 72 }} />
    </div>
  );
}
function SkeletonProfile() {
  return (
    <div style={{ display: 'inherit', alignItems: 'center', gap: 'inherit' }}>
      <Skeleton style={{ height: 32, width: 72 }} />
      <div style={{ display: 'inherit', alignItems: 'center', gap: 8 }}>
        <Skeleton radius="full" style={{ height: 44, width: 44 }} />
        <div>
          <Skeleton style={{ height: 16, width: 72, marginBottom: 4 }} />
          <Skeleton style={{ height: 16, width: 52 }} />
        </div>
      </div>
    </div>
  );
}
export default function HeaderActions() {
  const isLoggedIn = useAppSelector(state => state.polkamarkets.isLoggedIn);
  const isLoginLoading = useAppSelector(
    state => state.polkamarkets.isLoading.login
  );
  const theme = useTheme();
  const Root = theme.device.isDesktop ? Fragment : HeaderActionsWrapper;
  const Wrapper = theme.device.isDesktop ? 'div' : Container;
  const ActionLoadingComponent = features.fantasy.enabled
    ? SkeletonProfile
    : SkeletonWallet;
  const HeaderActionComponent = features.fantasy.enabled ? Profile : Wallet;
  const HeaderActionsGroupComponent = features.fantasy.enabled
    ? Fragment
    : HeaderActionsGroup;

  return (
    <Root>
      <Wrapper
        className={cn(headerActionsClasses.root, {
          [headerClasses.container]: !theme.device.isDesktop,
          [headerActionsClasses.reverse]: features.fantasy.enabled
        })}
      >
        <HeaderActionsGroupComponent>
          {ui.layout.header.networkSelector.enabled &&
            theme.device.isDesktop && (
              <NetworkSelector
                size="sm"
                responsive
                className={headerActionsClasses.network}
              />
            )}
          {isLoginLoading ? (
            <ActionLoadingComponent />
          ) : (
            <HeaderActionComponent isLoggedIn={isLoggedIn} />
          )}
        </HeaderActionsGroupComponent>
        <ThemeSelector />
      </Wrapper>
    </Root>
  );
}
