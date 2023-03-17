import { useCallback, useState } from 'react';

import cn from 'classnames';
import { Adornment, List, ListItem, useTheme } from 'ui';

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
  const theme = useTheme();
  const networks = useNetworks();
  const [rect, setRect] = useState<DOMRect | null>(null);
  const isDesktop = !responsive || theme.device.isDesktop;
  const isTv = !responsive || theme.device.isTv;
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
          networSelectorClasses.root,
          {
            [networSelectorClasses.rootResponsive]: responsive,
            'pm-c-button-ghost--default': !isDesktop,
            'pm-c-button-outline--default': isDesktop
          },
          className
        )}
      >
        <Icon name={networks.network.currency.iconName} size="lg" />
        {isDesktop && (
          <>
            {isTv && networks.network.name}
            <span className={networSelectorClasses.rootIcon}>
              <Icon name="Chevron" size="lg" dir={rect ? 'up' : 'down'} />
            </span>
          </>
        )}
      </button>
      <Modal
        disableGutters
        onHide={handleHide}
        disableOverlay={isDesktop}
        fullWidth={!isDesktop}
        show={!!rect}
        className={{
          backdrop: networSelectorClasses.backdrop,
          dialog: networSelectorClasses.dialog
        }}
        {...(isDesktop
          ? {
              style: {
                left: rect?.left,
                top: `calc(${rect?.top}px + ${rect?.height}px + var(--grid-margin))`,
                width: rect?.width
              }
            }
          : {
              initial: { bottom: -240 },
              animate: { bottom: 0 },
              exit: { bottom: -240 }
            })}
      >
        {!isDesktop && (
          <header className={networSelectorClasses.header}>
            <Text
              scale="heading"
              fontWeight="bold"
              className={networSelectorClasses.headerTitle}
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
            <ListItem
              key={network.id}
              className={networSelectorClasses.listItem}
            >
              <Button
                variant="ghost"
                fullwidth
                onClick={handleNetworkClick(network.name)}
                className={cn(networSelectorClasses.listItemButton, {
                  [networSelectorClasses.listItemSelected]:
                    network.id === networks.network.id
                })}
              >
                <span className={networSelectorClasses.listItemButtonIcon}>
                  <Icon
                    name={network.currency.iconName}
                    size={isDesktop ? 'lg' : 'xl'}
                  />
                </span>
                <Text
                  scale={isDesktop ? 'caption' : 'body'}
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
