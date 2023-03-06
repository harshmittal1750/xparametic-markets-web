import { useCallback, useState } from 'react';

import cn from 'classnames';
import { Adornment, List, ListItem, useMedia } from 'ui';

import { Button } from 'components/Button';
import Icon from 'components/Icon';
import Modal from 'components/Modal';
import Text from 'components/Text';

import { useNetworks } from 'contexts/networks';

import networSelectorClasses from './NetworkSelector.module.scss';

type NetworkSelectorProps = {
  responsive?: boolean;
  className?: string;
};

export default function NetworkSelector({
  responsive,
  className
}: NetworkSelectorProps) {
  const networks = useNetworks();
  const [rect, setRect] = useState<DOMRect | null>(null);
  const isDesktop = useMedia('(min-width: 1024px)');
  const isTv = useMedia('(min-width: 1280px)');
  const itsDesktop = !responsive || isDesktop;
  const itsTv = !responsive || isTv;
  const handleShow = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) =>
      setRect(event.currentTarget.getBoundingClientRect()),
    []
  );
  const handleHide = useCallback(() => setRect(null), []);
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
      <button
        type="button"
        aria-label="Switch network"
        onClick={handleShow}
        className={cn(
          networSelectorClasses.network,
          {
            [networSelectorClasses.responsive]: responsive,
            'pm-c-button-ghost--default': !itsDesktop,
            'pm-c-button-outline--default': itsDesktop
          },
          className
        )}
      >
        <Icon name={networks.network.currency.iconName} size="lg" />
        {itsDesktop && (
          <>
            {itsTv && networks.network.name}
            <span className={networSelectorClasses.networkIcon}>
              <Icon name="Chevron" size="lg" dir={rect ? 'up' : 'down'} />
            </span>
          </>
        )}
      </button>
      <Modal
        disableGutters
        onHide={handleHide}
        disableOverlay={itsDesktop}
        fullWidth={!itsDesktop}
        show={!!rect}
        className={{
          backdrop: networSelectorClasses.backdrop,
          dialog: networSelectorClasses.dialog
        }}
        {...(itsDesktop
          ? {
              style: {
                left: rect?.left,
                top: `calc(${rect?.top}px + ${rect?.height}px + var(--grid-margin)`,
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
          <header className={networSelectorClasses.header}>
            <Text
              scale="heading"
              fontWeight="bold"
              className={networSelectorClasses.title}
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
        <List className={networSelectorClasses.list}>
          {networks.networks.map(network => (
            <ListItem key={network.id} className={networSelectorClasses.item}>
              <Button
                variant="ghost"
                fullwidth
                onClick={handleNetworkClick(network.name)}
                className={cn(networSelectorClasses.button, {
                  [networSelectorClasses.selected]:
                    network.id === networks.network.id
                })}
              >
                <span className={networSelectorClasses.icon}>
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
