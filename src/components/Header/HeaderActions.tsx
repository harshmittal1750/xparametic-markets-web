import { Fragment, useCallback, useEffect, useState } from 'react';

import classNames from 'classnames';
import {
  Adornment,
  Container,
  List,
  ListItem,
  ListItemText,
  useMedia
} from 'ui';

import { Button } from 'components/Button';
import ConnectMetamask from 'components/ConnectMetamask';
import CreateMarket from 'components/CreateMarket';
import Feature from 'components/Feature';
import Icon from 'components/Icon';
import Modal from 'components/Modal';
import Text from 'components/Text';
import ToggleSwitch from 'components/ToggleSwitch';
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
  const isLoggedIn = useAppSelector(state => state.polkamarkets.isLoggedIn);
  const theme = useTheme();
  const [show, setShow] = useState(false);
  const [height, setHeight] = useState(0);
  const handleRef = useCallback((ref: HTMLDivElement) => {
    if (ref !== null) setHeight(ref.getBoundingClientRect().height);
  }, []);
  const isThemeDark = theme.theme === 'dark';
  const HeaderActionsComponent = isDesktop ? 'div' : Container;
  const HeaderActionsRootComponent = isDesktop
    ? Fragment
    : HeaderActionsWrapper;

  function handleTheme() {
    theme.setTheme(isThemeDark ? 'light' : 'dark');
  }
  function handleSettings() {
    setShow(prevShow => !prevShow);
  }
  function handleHide() {
    setShow(false);
  }

  return (
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
      <Modal
        disableGutters
        disablePortal={!isDesktop}
        backdrop={!isDesktop}
        show={show}
        onHide={handleHide}
        className={{
          root: HeaderActionsClasses.modal
        }}
        {...(!isDesktop && {
          initial: { y: window.innerHeight },
          animate: { y: `calc(${window.innerHeight}px - ${height}px)` },
          exit: { y: window.innerHeight }
        })}
      >
        <div ref={handleRef} className={HeaderActionsClasses.widget}>
          {!isDesktop && (
            <header className={HeaderActionsClasses.header}>
              <Text
                color="light"
                scale="heading"
                fontWeight="bold"
                className={HeaderActionsClasses.title}
              >
                Settings
              </Text>
              <Adornment edge="end">
                <Button
                  size="xs"
                  variant="ghost"
                  color="default"
                  aria-label="Settings"
                  onClick={handleHide}
                >
                  <Icon name="Cross" size="lg" />
                </Button>
              </Adornment>
            </header>
          )}
          <List className={HeaderActionsClasses.list}>
            <ListItem>
              <ListItemText>Dark Theme</ListItemText>
              <Adornment>
                <ToggleSwitch
                  name="Switch theme"
                  checked={isThemeDark}
                  onChange={handleTheme}
                />
              </Adornment>
            </ListItem>
            <ListItem>
              <CreateMarket fullwidth />
            </ListItem>
          </List>
        </div>
      </Modal>
    </HeaderActionsRootComponent>
  );
}
