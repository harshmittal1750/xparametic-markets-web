import { useCallback, useState } from 'react';

import cn from 'classnames';
import { Adornment, List, ListItem, useMedia, useRect } from 'ui';

import { Button } from 'components/Button';
import Icon from 'components/Icon';
import Modal from 'components/Modal';
import Text from 'components/Text';

import { useNetworks } from 'contexts/networks';

import networSelector from './NetworkSelector.module.scss';

type NetworkSelectorProps = Partial<Record<'responsive', boolean>>;

export default function NetworkSelector({ responsive }: NetworkSelectorProps) {
  const networks = useNetworks();
  const [show, setShow] = useState(false);
  const [ref, rect] = useRect<HTMLButtonElement>();
  const isDesktop = useMedia('(min-width: 1024px)');
  const isTv = useMedia('(min-width: 1280px)');
  const itsDesktop = !responsive || isDesktop;
  const itsTv = !responsive || isTv;
  const handleShow = useCallback(() => setShow(true), []);
  const handleHide = useCallback(() => setShow(false), []);
  const handleNetworkClick = useCallback(
    (name: string) => () => {
      const [network] = networks.networks.filter(
        _network => _network.name === name
      );

      networks.changeToNetwork(network);
      handleHide();
    },
    [handleHide, networks]
  );

  return (
    <>
      <Button
        ref={ref}
        variant={itsDesktop ? 'outline' : 'ghost'}
        color="default"
        aria-label="Switch network"
        onClick={handleShow}
        className={networSelector.network}
      >
        <Icon name={networks.network.currency.iconName} size="lg" />
        {itsDesktop && (
          <>
            {itsTv && networks.network.name}
            <span className={networSelector.networkIcon}>
              <Icon name="Chevron" size="lg" dir={show ? 'up' : 'down'} />
            </span>
          </>
        )}
      </Button>
      <Modal
        disableGutters
        onHide={handleHide}
        disableOverlay={itsDesktop}
        fullWidth={!itsDesktop}
        show={show}
        className={{
          backdrop: networSelector.backdrop,
          dialog: networSelector.dialog
        }}
        {...(itsDesktop
          ? {
              style: {
                left: rect?.left,
                top: rect?.top + rect?.height + 16,
                width: rect?.width
              }
            }
          : {
              initial: { bottom: '-100%' },
              animate: { bottom: 0 },
              exit: { bottom: '-100%' }
            })}
      >
        {!itsDesktop && (
          <header className={networSelector.header}>
            <Text
              scale="heading"
              fontWeight="bold"
              className={networSelector.title}
            >
              Select Network
            </Text>
            <Adornment $edge="end">
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
        <List className={networSelector.list}>
          {networks.networks.map(network => (
            <ListItem key={network.id} className={networSelector.item}>
              <Button
                variant="ghost"
                fullwidth
                onClick={handleNetworkClick(network.name)}
                className={cn(networSelector.button, {
                  [networSelector.selected]: network.id === networks.network.id
                })}
              >
                <span className={networSelector.icon}>
                  <Icon
                    name={network.currency.iconName}
                    size={itsDesktop ? 'lg' : 'xl'}
                  />
                </span>
                <Text
                  scale={itsDesktop ? 'caption' : 'body'}
                  fontWeight="semibold"
                >
                  {network.name}
                </Text>
              </Button>
            </ListItem>
          ))}
        </List>
      </Modal>
    </>
  );
}
