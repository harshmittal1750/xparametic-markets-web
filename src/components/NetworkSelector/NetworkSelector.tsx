import { useCallback, useState } from 'react';

import cn from 'classnames';
import { Adornment, List, ListItem, useTheme } from 'ui';

import { Button, ButtonProps } from 'components/Button';
import Icon from 'components/Icon';
import Modal from 'components/Modal';
import Text from 'components/Text';

import { useNetworks } from 'contexts/networks';

import networSelectorClasses from './NetworkSelector.module.scss';

interface NetworkSelectorProps extends ButtonProps {
  responsive?: boolean;
  anchorOrigin?: 'left' | 'right';
}
type Rect = DOMRect | null;

const defaultSx = {
  initial: { bottom: -240 },
  animate: { bottom: 0 },
  exit: { bottom: -240 }
};

function getDefaultSx(
  rect: Rect,
  anchorOrigin: NetworkSelectorProps['anchorOrigin'] = 'left'
) {
  return {
    style: {
      top: `calc(${rect?.height}px + ${rect?.top}px + 8px)`,
      width: rect?.width,
      [anchorOrigin]:
        anchorOrigin === 'left'
          ? rect?.left
          : Math.abs(Math.round(rect?.right || 0) - window.innerWidth)
    }
  };
}
export default function NetworkSelector({
  responsive,
  className,
  anchorOrigin = 'left',
  ...props
}: NetworkSelectorProps) {
  const theme = useTheme();
  const networks = useNetworks();
  const [rect, setRect] = useState<Rect>(null);
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
  const isDesktop = !responsive || theme.device.isDesktop;
  const isTv = !responsive || theme.device.isTv;
  const isSmall = props.size === 'xs';

  return (
    <>
      <Button
        type="button"
        aria-label="Switch network"
        onClick={handleShow}
        variant="outline"
        className={cn(
          networSelectorClasses.root,
          {
            [networSelectorClasses.sizeXs]: isSmall
          },
          className
        )}
        {...props}
      >
        {!isSmall && (
          <Icon name={networks.network.currency.iconName} size="lg" />
        )}
        {isDesktop && (
          <>
            {isTv && (isSmall ? 'Change' : networks.network.name)}
            {!isSmall && (
              <span className={networSelectorClasses.rootIcon}>
                <Icon name="Chevron" size="lg" dir={rect ? 'up' : 'down'} />
              </span>
            )}
          </>
        )}
      </Button>
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
        {...(isDesktop ? getDefaultSx(rect, anchorOrigin) : defaultSx)}
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
