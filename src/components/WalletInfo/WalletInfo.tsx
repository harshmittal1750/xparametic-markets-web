import { Link } from 'react-router-dom';

import { formatNumberToString } from 'helpers/math';

import Feature from 'components/Feature';

import { useAppSelector, useNetwork } from 'hooks';

import { Transak } from '../integrations';
import WalletInfoBuy from './WalletInfoBuy';
import WalletInfoClaim from './WalletInfoClaim';

function WalletInfo() {
  const { network } = useNetwork();

  const polkBalance = useAppSelector(state => state.polkamarkets.polkBalance);
  const ethBalance = useAppSelector(state => state.polkamarkets.ethBalance);
  const ethAddress = useAppSelector(state => state.polkamarkets.ethAddress);

  return (
    <div className="pm-c-wallet-info">
      <div className="pm-c-wallet-info__currency">
        {formatNumberToString(polkBalance)}
        <span className="pm-c-wallet-info__currency__ticker"> IFL</span>
        <Feature name="fantasy">
          <WalletInfoClaim />
        </Feature>
        <Feature name="regular">
          <WalletInfoBuy />
        </Feature>
      </div>
      <div className="pm-c-wallet-info__currency">
        {ethBalance.toFixed(4)}
        <span className="pm-c-wallet-info__currency__ticker">
          {' '}
          {network.currency.ticker}
        </span>
        <Link
          to={`/user/${ethAddress}`}
          className="pm-c-button-subtle--default pm-c-button--sm pm-c-wallet-info__currency__button"
        >
          {ethAddress.match(/^\d\w{4}|\d\w{4}$/gm)?.join('...')}
        </Link>
        <Transak />
      </div>
    </div>
  );
}

export default WalletInfo;
