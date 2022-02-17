import { useMemo } from 'react';

import TransakSDK from '@transak/transak-sdk';
import { environment } from 'config';
import { TransakConfig } from 'types/integrations/transak';

import { useAppSelector, useNetwork } from 'hooks';

import { Button } from '../../Button';

const baseConfig: TransakConfig = {
  apiKey: environment.TRANSAK_API_KEY!,
  environment: 'STAGING',
  themeColor: '000000',
  hostURL: window.location.origin,
  widgetHeight: '700px',
  widgetWidth: '500px'
};

function buildCustomConfig({
  network,
  cryptoCurrencyCode,
  walletAddress
}): TransakConfig {
  return { ...baseConfig, network, cryptoCurrencyCode, walletAddress };
}

function Transak() {
  const { network } = useNetwork();
  const walletAddress = useAppSelector(state => state.bepro.ethAddress);

  const transak = useMemo(() => {
    const transakConfig = buildCustomConfig({
      network: 'mainnet',
      cryptoCurrencyCode: network.currency.ticker,
      walletAddress
    });

    return new TransakSDK(transakConfig);
  }, [network, walletAddress]);

  function openWidget() {
    transak.init();
  }

  return (
    <Button size="sm" color="primary" onClick={openWidget}>
      {`Buy $${network.currency.ticker}`}
    </Button>
  );
}

export default Transak;
