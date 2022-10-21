import { formatNumberToString } from 'helpers/math';

import { useAppSelector, useNetwork } from 'hooks';

import { Transak } from '../integrations';

function WalletInfo() {
  const { network } = useNetwork();
  const ethBalance = useAppSelector(state => state.polkamarkets.ethBalance);
  const polkBalance = useAppSelector(state => state.polkamarkets.polkBalance);
  const walletAddress = useAppSelector(state => state.polkamarkets.ethAddress);

  return (
    <div className="pm-c-wallet-info">
      <div
        className="pm-c-button-outline--base pm-c-button--sm"
        style={{ padding: '0.4rem 1.4rem', height: '100%' }}
      >
        {/* eslint-disable-next-line react/jsx-one-expression-per-line */}
        {formatNumberToString(polkBalance)} POLK
        {network.buyEc20Url && (
          <a
            style={{ padding: '0.5rem 1rem' }}
            className="pm-c-button-normal--primary pm-c-button--sm"
            target="_blank"
            rel="noreferrer"
            href={network.buyEc20Url}
          >
            Buy
          </a>
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
