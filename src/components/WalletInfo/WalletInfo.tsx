import { Link } from 'react-router-dom';

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
      <div className="pm-c-wallet-info__currency">
        {formatNumberToString(polkBalance)}
        <span className="pm-c-wallet-info__currency__ticker"> POLK</span>
        {network.buyEc20Url && (
          <a
            className="pm-c-button-normal--primary pm-c-button--sm pm-c-wallet-info__currency__button"
            target="_blank"
            rel="noreferrer"
            href={network.buyEc20Url}
          >
            Buy $POLK
          </a>
        )}
      </div>
      <div className="pm-c-wallet-info__currency">
        {ethBalance.toFixed(4)}
        <span className="pm-c-wallet-info__currency__ticker">
          {' '}
          {network.currency.name.match(/\w{3}/)?.[0].toUpperCase()}
        </span>
        <Link
          to={`/user/${walletAddress}`}
          className="pm-c-button-subtle--default pm-c-button--sm pm-c-wallet-info__currency__button"
        >
          {walletAddress.match(/^\d\w{4}|\d\w{4}$/gm)?.join('...')}
        </Link>
        <Transak />
      </div>
    </div>
  );
}

export default WalletInfo;
