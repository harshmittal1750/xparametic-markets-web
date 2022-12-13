import { Fragment, useCallback, useEffect, useState } from 'react';

import cn from 'classnames';
import {
  Adornment,
  ContainerClasses,
  List,
  ListItem,
  Toggle,
  useMedia
} from 'ui';

import { Button } from 'components/Button';
import ConnectMetamask from 'components/ConnectMetamask';
import Icon from 'components/Icon';
import Modal from 'components/Modal';
import Text from 'components/Text';
import WalletInfo from 'components/WalletInfo';

import { useNetworks } from 'contexts/networks';

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
  const isLoggedIn = useAppSelector(state => state.polkamarkets.isLoggedIn);
  const networks = useNetworks();
  const theme = useTheme();
  const isDesktop = useMedia('(min-width: 1024px)');
  const [show, setShow] = useState(false);
  const handleHide = useCallback(() => setShow(false), []);
  const handleChangeNetwork = useCallback(
    (name: string) => () => {
      const [network] = networks.networks.filter(
        _network => _network.name === name
      );

      handleHide();
      networks.changeToNetwork(network);
    },
    [handleHide, networks]
  );
  const isThemeDark = theme.theme === 'dark';
  const HeaderActionsRootComponent = isDesktop
    ? Fragment
    : HeaderActionsWrapper;

  function handleTheme() {
    theme.setTheme(isThemeDark ? 'light' : 'dark');
  }
  function handleNetworks() {
    setShow(prevShow => !prevShow);
  }

  return (
    <HeaderActionsRootComponent>
      <div
        className={cn(HeaderActionsClasses.root, {
          [HeaderClasses.container]: !isDesktop,
          [ContainerClasses.root]: !isDesktop,
          [HeaderActionsClasses.high]: show
        })}
      >
        {isLoggedIn ? <WalletInfo /> : <ConnectMetamask />}
        <div className={cn('pm-c-wallet-info', HeaderActionsClasses.settings)}>
          <Button
            variant="outline"
            color="default"
            aria-label="Switch theme"
            onClick={handleTheme}
          >
            <Icon name={isThemeDark ? 'Sun' : 'Moon'} />
          </Button>
          <Button
            variant="outline"
            color="default"
            aria-label="Switch network"
            onClick={handleNetworks}
          >
            <Icon name={networks.network.currency.iconName} />
          </Button>
        </div>
      </div>
      <Modal
        disableGutters
        onHide={handleHide}
        disablePortal={!isDesktop}
        disableOverlay={isDesktop}
        fullWidth={!isDesktop}
        show={show}
        className={{
          backdrop: HeaderActionsClasses.backdrop,
          dialog: HeaderActionsClasses.dialog
        }}
        {...(!isDesktop && {
          initial: { bottom: '-100%' },
          animate: { bottom: 0 },
          exit: { bottom: '-100%' }
        })}
      >
        {!isDesktop && (
          <header className={HeaderActionsClasses.header}>
            <Text
              color="light"
              scale="heading"
              fontWeight="bold"
              className={HeaderActionsClasses.title}
            >
              Select Network
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
          {networks.networks.map(network => (
            <ListItem key={network.id} className={HeaderActionsClasses.item}>
              <Button
                variant="ghost"
                fullwidth
                onClick={handleChangeNetwork(network.name)}
                className={cn(HeaderActionsClasses.button, {
                  [HeaderActionsClasses.selected]:
                    network.id === networks.network.id
                })}
              >
                <span className={HeaderActionsClasses.icon}>
                  <Icon name={network.currency.iconName} size="xl" />
                </span>
                <Text fontWeight="semibold">{network.name}</Text>
              </Button>
            </ListItem>
          ))}
        </List>
      </Modal>
    </HeaderActionsRootComponent>
  );
}
