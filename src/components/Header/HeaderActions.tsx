import { Fragment, useEffect, useState } from 'react';

import classNames from 'classnames';
import { Container, useMedia } from 'ui';

import { Button } from 'components/Button';
import ConnectMetamask from 'components/ConnectMetamask';
import Icon from 'components/Icon';
import Modal from 'components/Modal';
import WalletInfo from 'components/WalletInfo';

import { useTheme, useAppSelector, usePortal } from 'hooks';

import HeaderClasses from './Header.module.scss';
import HeaderActionsClasses from './HeaderActions.module.scss';

function HeaderActionsWrapper(props: React.PropsWithChildren<{}>) {
  const Portal = usePortal({
    root: document.getElementById('root')
  });

  useEffect(() => {
    Portal.mount(true);
  }, [Portal]);

  return <Portal {...props} />;
}
export default function HeaderActions() {
  const isDesktop = useMedia('(min-width: 1024px)');
  const [show, setShow] = useState(false);
  const isLoggedIn = useAppSelector(state => state.polkamarkets.isLoggedIn);
  const theme = useTheme();
  const isThemeDark = theme.theme === 'dark';
  const themeAnti = isThemeDark ? 'light' : 'dark';
  const HeaderActionsComponent = isDesktop ? 'div' : Container;
  const HeaderActionsRootComponent = isDesktop
    ? Fragment
    : HeaderActionsWrapper;

  function handleSettings() {
    setShow(prevShow => !prevShow);
    // theme.setTheme(themeAnti);
  }
  function handleHide() {
    setShow(false);
  }

  return (
    <>
      <HeaderActionsRootComponent>
        <HeaderActionsComponent
          className={classNames(HeaderActionsClasses.root, {
            [HeaderClasses.container]: !isDesktop
          })}
        >
          {isLoggedIn ? <WalletInfo /> : <ConnectMetamask />}
          <Button
            variant="outline"
            color="default"
            aria-label="Settings"
            onClick={handleSettings}
            className={HeaderActionsClasses.settings}
          >
            <Icon name="Gear" />
          </Button>
        </HeaderActionsComponent>
      </HeaderActionsRootComponent>
      <Modal backdrop={!isDesktop} show={show} onHide={handleHide}>
        test
      </Modal>
    </>
  );
}
