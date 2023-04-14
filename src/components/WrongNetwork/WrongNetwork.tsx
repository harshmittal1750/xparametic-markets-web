import type { Network } from 'types/network';
import { Alert, useTheme } from 'ui';

import { Button, Text } from 'components';

import wrongNetwork from './WrongNetwork.module.scss';

type WrongNetworkProps = {
  network: Network;
};

export default function WrongNetwork({ network }: WrongNetworkProps) {
  const theme = useTheme();

  return (
    <Alert
      $type="warning"
      $variant="subtle"
      $enableGutters={!theme.device.isTablet}
    >
      <Text
        fontWeight="medium"
        scale={theme.device.isDesktop ? 'caption' : 'tiny'}
      >
        The selected network <strong>{network.name}</strong> does not match to
        the one on your wallet. Consider{' '}
        <Button
          variant="ghost"
          size={theme.device.isDesktop ? 'sm' : 'xs'}
          className={wrongNetwork.link}
        >
          changing it
        </Button>{' '}
        for better experience.
      </Text>
    </Alert>
  );
}
