import { useCallback } from 'react';

import { formatNumberToString } from 'helpers/math';

import { useAppSelector, useNetwork } from 'hooks';

import { Button } from '../Button';
import { Transak } from '../integrations';

function WalletInfo() {
  const { network } = useNetwork();
  const ethBalance = useAppSelector(state => state.polkamarkets.ethBalance);
  const polkBalance = useAppSelector(state => state.polkamarkets.polkBalance);
  const walletAddress = useAppSelector(state => state.polkamarkets.ethAddress);
  const handleClickBuy = useCallback(() => {
    window.open(network.buyEc20Url, '_blank');
  }, [network.buyEc20Url]);

  return (
    <div className="pm-c-wallet-info">
      <div
        className="pm-c-button-outline--base pm-c-button--sm"
        style={{ padding: '0.4rem 1.4rem', height: '100%' }}
      >
        {/* eslint-disable-next-line react/jsx-one-expression-per-line */}
        {formatNumberToString(polkBalance)} POLK
        {network.buyEc20Url && (
          <Button
            color="primary"
            size="sm"
            style={{ padding: '0.5rem 1rem' }}
            onClick={handleClickBuy}
          >
            Buy
          </Button>
        )}
      </div>
      <div
        className="pm-c-button-outline--base pm-c-button--sm"
        style={{
          padding: '0.4rem 1.4rem',
          height: '100%'
        }}
      >
        {/* eslint-disable react/jsx-one-expression-per-line */}
        {ethBalance.toFixed(4)}{' '}
        {network.currency.name.match(/\w{3}/)?.[0].toUpperCase()}
        <span
          className="pm-c-button-normal--default pm-c-button--sm"
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: 'rgb(255 255 255 / 0.1)',
            borderColor: 'transparent'
          }}
        >
          {walletAddress.match(/^\d\w{4}|\d\w{4}$/gm)?.join('...')}
        </span>
        <Transak />
      </div>
    </div>
  );
}

export default WalletInfo;
