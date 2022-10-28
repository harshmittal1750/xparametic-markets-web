import type React from 'react';
import { useCallback, useState } from 'react';

import Adornment from 'components/Adornment';
import { Button } from 'components/Button';
import ConnectMetamask from 'components/ConnectMetamask';
import Icon from 'components/Icon';
import List from 'components/List';
import ListItem from 'components/ListItem';
import ListItemText from 'components/ListItemText';
import Modal from 'components/Modal';
import WalletInfo from 'components/WalletInfo';

import { useAppSelector, useTheme } from 'hooks';

import NavbarClasses from './NavBar.module.scss';

const arrChains = [
  {
    name: 'Ethereum',
    iconName: 'Ethereum',
    onClick: () => {}
  },
  {
    name: 'Binance',
    iconName: 'Ethereum',
    onClick: () => {}
  },
  {
    name: 'Moonriver',
    iconName: 'Ethereum',
    onClick: () => {}
  }
] as const;

export default function NavBarActions() {
  const theme = useTheme();
  const isLoggedIn = useAppSelector(state => state.polkamarkets.isLoggedIn);
  const [show, setShow] = useState(false);
  const handleHide = useCallback(() => setShow(false), []);
  const isThemeDark = theme.theme === 'dark';
  const themeAnti = isThemeDark ? 'light' : 'dark';

  function handleTheme() {
    theme.setTheme(themeAnti);
  }
  function handleChains() {
    setShow(true);
  }

  return (
    <>
      <div className="pm-l-layout__header__actions">
        {isLoggedIn ? <WalletInfo /> : <ConnectMetamask />}
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
          aria-label="Switch chain"
          onClick={handleChains}
        >
          <Icon name="Ethereum" />
        </Button>
      </div>
      <Modal
        show={show}
        onHide={handleHide}
        className={{
          dialog: NavbarClasses.widget
        }}
      >
        <List>
          {arrChains.map(chain => (
            <ListItem key={chain.name}>
              <Adornment edge="start">
                <Icon name={chain.iconName} />
              </Adornment>
              <ListItemText>{chain.name}</ListItemText>
            </ListItem>
          ))}
        </List>
      </Modal>
    </>
  );
}
