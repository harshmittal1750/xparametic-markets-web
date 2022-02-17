import { useReducer, useEffect, useMemo } from 'react';

import TransakSDK from '@transak/transak-sdk';
import { environment } from 'config';
import { TransakConfig } from 'types/integrations/transak';

import { useAppSelector, useNetwork } from 'hooks';

import { Button } from '../../Button';

type TransakInitialState = {
  widgetOpen: boolean;
  loading: boolean;
  error: string | null;
};

type TransakActionState =
  | 'TRANSAK_WIDGET_INITIALISED'
  | 'TRANSAK_WIDGET_OPEN'
  | 'TRANSAK_WIDGET_CLOSE'
  | 'TRANSAK_ORDER_CREATED'
  | 'TRANSAK_ORDER_CANCELLED'
  | 'TRANSAK_ORDER_FAILED'
  | 'TRANSAK_ORDER_SUCCESSFUL';

const initialState: TransakInitialState = {
  widgetOpen: false,
  loading: false,
  error: null
};

type TransakAction = {
  type: TransakActionState;
};

function transakReducer(state: TransakInitialState, action: TransakAction) {
  const { type } = action;

  switch (type) {
    case 'TRANSAK_WIDGET_INITIALISED':
      return {
        ...state,
        widgetOpen: true
      };
    case 'TRANSAK_WIDGET_OPEN':
      return {
        ...state,
        widgetOpen: true
      };
    case 'TRANSAK_WIDGET_CLOSE':
      return {
        ...state,
        widgetOpen: false
      };
    case 'TRANSAK_ORDER_CREATED':
      return {
        ...state,
        loading: true
      };
    case 'TRANSAK_ORDER_CANCELLED':
      return {
        ...state,
        loading: false
      };
    case 'TRANSAK_ORDER_FAILED':
      return {
        ...state,
        loading: false,
        error: 'Order failed'
      };
    case 'TRANSAK_ORDER_SUCCESSFUL':
      return {
        ...state,
        loading: false,
        error: null
      };

    default:
      return {
        ...state
      };
  }
}

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
  const [transakState, transakDispatch] = useReducer(
    transakReducer,
    initialState
  );

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

  useEffect(() => {
    transak.on(transak.ALL_EVENTS, data => {
      transakDispatch({ type: data.eventName });
    });
  }, [transak]);

  function openWidget() {
    transak.init();
  }

  return (
    <Button
      size="sm"
      style={{ padding: '0.5rem 1rem' }}
      color="primary"
      onClick={openWidget}
      loading={transakState.loading}
      disabled={transakState.widgetOpen}
    >
      {`Buy $${network.currency.ticker}`}
    </Button>
  );
}

export default Transak;
