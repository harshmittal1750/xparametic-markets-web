import { Fragment, useCallback, useState } from 'react';

import cn from 'classnames';
import { Adornment, Divider, List, ListItem, Popover, useTheme } from 'ui';

import { Button, ButtonProps } from 'components/Button';
import Icon from 'components/Icon';
import Text from 'components/Text';

import { useNetworks } from 'contexts/networks';

import networSelectorClasses from './NetworkSelector.module.scss';

interface NetworkSelectorProps extends ButtonProps {
  responsive?: boolean;
}

export default function NetworkSelector({
  responsive,
  className,
  ...props
}: NetworkSelectorProps) {
  const theme = useTheme();
  const networks = useNetworks();
  const [show, setShow] = useState<HTMLButtonElement | null>(null);
  const handleShow = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) =>
      setShow(event.currentTarget),
    []
  );
  const handleHide = useCallback(() => setShow(null), []);
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
            <span className={networSelectorClasses.rootIcon}>
              <Icon name="Chevron" size="lg" dir={show ? 'up' : 'down'} />
            </span>
          </>
        )}
      </Button>
      <Popover position="bottomLeft" onHide={handleHide} show={show}>
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
        <List
          $disableGutters={!theme.device.isDesktop}
          className={networSelectorClasses.list}
        >
          {networks.networks.map(network => (
            <Fragment key={network.id}>
              <Divider />
              <ListItem className={networSelectorClasses.listItem}>
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
            </Fragment>
          ))}
        </List>
      </Popover>
    </>
  );
}
