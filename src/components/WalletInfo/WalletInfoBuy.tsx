import { useNetwork } from 'hooks';

import { Button } from '../Button';

function WalletInfoBuy() {
  const { network } = useNetwork();

  return (
    <>
      {network.buyEc20Url ? (
        <Button
          className="pm-c-button-normal--primary pm-c-button--sm pm-c-wallet-info__currency__button"
          style={{ padding: '0.5rem 1rem' }}
          onClick={() => window.open(network.buyEc20Url, '_blank')}
        >
          Buy $POLK
        </Button>
      ) : null}
    </>
  );
}

export default WalletInfoBuy;
