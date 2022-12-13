import { Fragment, useCallback, useEffect, useState } from 'react';

import cn from 'classnames';
import {
  Adornment,
  ContainerClasses,
  List,
  ListItem,
  ListItemText,
  Toggle,
  useMedia
} from 'ui';

import { Button } from 'components/Button';
import ConnectMetamask from 'components/ConnectMetamask';
import Icon from 'components/Icon';
import Modal from 'components/Modal';
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
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const [network] = networks.networks.filter(
        ({ name }) => name === event.target.value
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
        <List className={HeaderActionsClasses.list}>
          {networks.networks.map(network => (
            <ListItem key={network.id}>
              <Icon name={network.currency.iconName} />
              <ListItemText>{network.name}</ListItemText>
              <Adornment edge="end">
                <Toggle
                  type="radio"
                  value={network.name}
                  checked={network.id === networks.network.id}
                  onChange={handleChangeNetwork}
                />
              </Adornment>
            </ListItem>
          ))}
        </List>
      </Modal>
    </HeaderActionsRootComponent>
  );
}
