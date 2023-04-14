import type { Network } from 'types/network';
import { Alert } from 'ui';

import { Button, Text } from 'components';

type WrongNetworkProps = {
  network: Network;
};

export default function WrongNetwork({ network }: WrongNetworkProps) {
  return (
    <Alert $type="warning" $variant="subtle">
      <Text fontWeight="medium" scale="tiny">
        The selected network <strong>{network.name}</strong> does not match to
        the one on your wallet. Consider{' '}
        <Button
          variant="ghost"
          size="xs"
          style={{
            padding: 0,
            color: 'inherit',
            verticalAlign: 'baseline',
            textDecoration: 'underline'
          }}
        >
          changing it
        </Button>{' '}
        for better experience.
      </Text>
    </Alert>
  );
}
