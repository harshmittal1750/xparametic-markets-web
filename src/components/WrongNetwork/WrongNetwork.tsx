import type { Network } from 'types/network';
import { Banner } from 'ui';

import Link from 'components/Link';
import NetworkSelector from 'components/NetworkSelector';

import wrongNetworkClasses from './WrongNetwork.module.scss';

type WrongNetworkProps = {
  network: Network;
};

export default function WrongNetwork({ network }: WrongNetworkProps) {
  return (
    <>
      {network.name === 'Sepolia Testnet' ? (
        ''
      ) : (
        <Banner
          $type="warning"
          $variant="subtle"
          actions={
            <NetworkSelector
              size="xs"
              color="warning"
              variant="ghost"
              className={wrongNetworkClasses.change}
            />
          }
        >
          The selected network <strong>{network.name}</strong> does not match
          Parametric&apos;s networks. <strong>Change</strong> the App network to
          <strong> Sepolia Testnet</strong> Network from the wallet.
        </Banner>
      )}
    </>
  );
}
