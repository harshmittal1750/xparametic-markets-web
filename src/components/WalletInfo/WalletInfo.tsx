import { Link } from 'react-router-dom';

import { formatNumberToString } from 'helpers/math';
import { login } from 'redux/ducks/polkamarkets';
import { PolkamarketsService } from 'services';

import { useAppDispatch, useAppSelector, useNetwork } from 'hooks';

import { Button } from '../Button';
import { Transak } from '../integrations';

function WalletInfo() {
  const { network, networkConfig } = useNetwork();
  const dispatch = useAppDispatch();

  const appState = useAppSelector(state => state);
  const isPolkClaimed = useAppSelector(state => state.polkamarkets.polkClaimed);

  async function handleClaim() {
    const polkamarketsService = new PolkamarketsService(networkConfig);

    try {
      // TODO spinner
      // TODO toast

      // performing claim action on smart contract
      await polkamarketsService.claimPolk();
      // updating wallet
      await dispatch(login(networkConfig));
    } catch (error) {
      // TODO error handling
    }

    return true;
  }

  return (
    <div className="pm-c-wallet-info">
      <div className="pm-c-wallet-info__currency">
        {formatNumberToString(appState.polkamarkets.polkBalance)}
        <span className="pm-c-wallet-info__currency__ticker"> IFL</span>
        {network.buyEc20Url && (
          <Button
            className="pm-c-button-normal--primary pm-c-button--sm pm-c-wallet-info__currency__button"
            disabled={isPolkClaimed}
            onClick={handleClaim}
          >
            {isPolkClaimed ? '$IFL Claimed' : 'Claim $IFL'}
          </Button>
        )}
      </div>
      <div className="pm-c-wallet-info__currency">
        {appState.polkamarkets.ethBalance.toFixed(4)}
        <span className="pm-c-wallet-info__currency__ticker">
          {' '}
          {network.currency.ticker}
        </span>
        <Link
          to={`/user/${appState.polkamarkets.ethAddress}`}
          className="pm-c-button-subtle--default pm-c-button--sm pm-c-wallet-info__currency__button"
        >
          {appState.polkamarkets.ethAddress
            .match(/^\d\w{4}|\d\w{4}$/gm)
            ?.join('...')}
        </Link>
        <Transak />
      </div>
    </div>
  );
}

export default WalletInfo;
