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
      <div className="pm-c-button-outline--base pm-c-button--sm pm-c-wallet-info__currency">
        {/* eslint-disable-next-line react/jsx-one-expression-per-line */}
        {formatNumberToString(polkBalance)} POLK
        {network.buyEc20Url && (
          <a
            className="pm-c-button-normal--primary pm-c-button--sm pm-c-wallet-info__currency__button"
            target="_blank"
            rel="noreferrer"
            href={network.buyEc20Url}
          >
            Buy
          </a>
        )}
      </div>
      <div className="pm-c-button-outline--base pm-c-button--sm pm-c-wallet-info__currency">
        {/* eslint-disable react/jsx-one-expression-per-line */}
        {ethBalance.toFixed(4)}{' '}
        {network.currency.name.match(/\w{3}/)?.[0].toUpperCase()}
        <span className="pm-c-button-normal--default pm-c-button--sm pm-c-wallet-info__currency__button pm-c-wallet-info__currency__address">
          {walletAddress.match(/^\d\w{4}|\d\w{4}$/gm)?.join('...')}
        </span>
        <Transak />
      </div>
    </div>
  );
}

export default WalletInfo;
