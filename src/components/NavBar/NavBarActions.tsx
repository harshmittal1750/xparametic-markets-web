import { useCallback, useState } from 'react';

import {
  Adornment,
  List,
  ListItem,
  ListItemText,
  ThemeModes,
  useTheme
} from 'ui';

import { Button } from 'components/Button';
import ConnectMetamask from 'components/ConnectMetamask';
import Icon from 'components/Icon';
import type { IconProps } from 'components/Icon';
import Modal from 'components/Modal';
import WalletInfo from 'components/WalletInfo';

import { useAppSelector } from 'hooks';

import NavbarClasses from './NavBar.module.scss';

const arrChains = ['Ethereum', 'Binance', 'Moonriver'] as IconProps['name'][];
const themeIcons = {
  light: 'Sun',
  dark: 'Moon',
  system: 'Sparkles'
} as const;

export default function NavBarActions() {
  const theme = useTheme();
  const isLoggedIn = useAppSelector(state => state.polkamarkets.isLoggedIn);
  const [show, setShow] = useState(false);
  const [appChain, setAppChain] = useState<IconProps['name']>('Ethereum');
  const handleHide = useCallback(() => setShow(false), []);
  const handleAppChain = useCallback(
    _chain => () => {
      handleHide();
      setAppChain(_chain);
    },
    [handleHide]
  );
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleTheme = useCallback(
    (mode: ThemeModes) => theme.setMode(mode),
    [theme]
  );

  function handleChains() {
    setShow(true);
  }

  return (
    <>
      <button type="button" onClick={() => theme.setMode('light')}>
        light
      </button>
      <button type="button" onClick={() => theme.setMode('dark')}>
        dark
      </button>
      <button type="button" onClick={() => theme.setMode('system')}>
        system
      </button>
      <div className="pm-l-layout__header__actions">
        {isLoggedIn ? <WalletInfo /> : <ConnectMetamask />}
        <Button variant="outline" color="default" aria-label="Switch theme">
          <Icon name={themeIcons[theme.mode]} />
        </Button>
        <Button
          variant="outline"
          color="default"
          aria-label="Switch chain"
          onClick={handleChains}
        >
          <Icon name={appChain} />
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
            <ListItem
              key={chain}
              onClick={handleAppChain(chain)}
              role="button"
              tabIndex={0}
            >
              <Adornment $edge="start">
                <Icon name={chain} />
              </Adornment>
              <ListItemText>{chain}</ListItemText>
            </ListItem>
          ))}
        </List>
      </Modal>
    </>
  );
}
