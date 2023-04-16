import { useCallback } from 'react';

import type { Network } from 'types/network';
import { Alert, useTheme } from 'ui';

import { Button, Icon, Text } from 'components';

import { useLayout } from 'hooks';

import wrongNetwork from './WrongNetwork.module.scss';

type WrongNetworkProps = {
  network: Network;
};

export default function WrongNetwork({ network }: WrongNetworkProps) {
  const theme = useTheme();
  const layout = useLayout();
  const handleChangeClick = useCallback(
    () => layout.networkSelector.current?.click(),
    [layout.networkSelector]
  );

  return (
    <Alert
      $type="warning"
      $variant="subtle"
      $enableGutters={!theme.device.isDesktop}
      className={wrongNetwork.root}
    >
      <Icon name="Warning" className={wrongNetwork.icon} />
      <Text
        fontWeight="medium"
        scale={theme.device.isDesktop ? 'caption' : 'tiny'}
      >
        The selected network <strong>{network.name}</strong> does not match your
        wallet&apos;s active one. Consider{' '}
        <Button
          variant="ghost"
          size={theme.device.isDesktop ? 'sm' : 'xs'}
          className={wrongNetwork.link}
          onClick={handleChangeClick}
        >
          changing it
        </Button>{' '}
        for a better experience.
      </Text>
    </Alert>
  );
}
