import type { Network } from 'types/network';
import { Alert, useTheme } from 'ui';

import { Icon, NetworkSelector, Text } from 'components';

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
      $enableGutters={!theme.device.isDesktop}
      className={wrongNetwork.root}
    >
      <Icon name="Warning" className={wrongNetwork.icon} />
      <Text
        fontWeight="medium"
        scale={theme.device.isDesktop ? 'caption' : 'tiny'}
      >
        The selected network <strong>{network.name}</strong> does not match your
        wallet&apos;s active one. Change the App network or learn how to change
        it in wallet.
        <NetworkSelector size="xs" />
      </Text>
    </Alert>
  );
}
