import { ReactNode } from 'react';

import { useNetwork } from 'hooks';

import { Button } from '../Button';
import { Transak } from '../integrations';

type Wallet = {
  id: string;
  balance: number | string;
  currencyIcon: ReactNode;
};

type WalletInfoProps = {
  wallets: Wallet[];
  address: string;
};

function WalletInfo({ wallets, address }: WalletInfoProps) {
  const { network } = useNetwork();

  return (
    <div className="pm-c-wallet-info">
      <Button
        variant="outline"
        color="base"
        size="sm"
        style={{ padding: '0.4rem 1.4rem', height: '100%' }}
      >
        {wallets[1].balance}
        {network.buyEc20Url && (
          <Button
            color="primary"
            size="sm"
            style={{ padding: '0.5rem 1rem' }}
            onClick={() => window.open(network.buyEc20Url, '_blank')}
          >
            Buy $POLK
          </Button>
        )}
      </Button>
      <Button
        variant="outline"
        color="base"
        size="sm"
        style={{
          padding: '0.4rem 1.4rem',
          height: '100%'
        }}
      >
        {wallets[0].balance}
        ETH
        <Button
          color="default"
          size="sm"
          style={{ padding: '0.5rem 1rem' }}
          onClick={() => window.open(network.buyEc20Url, '_blank')}
        >
          {address.match(/^\d\w{4}|\d\w{4}$/gm)?.join('...')}
        </Button>
        <Transak />
      </Button>
    </div>
  );
}

export default WalletInfo;
