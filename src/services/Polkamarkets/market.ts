import identity from 'lodash/identity';
import pickBy from 'lodash/pickBy';
import { Market } from 'models/market';

import api, { polkamarketsApiUrl } from './api';

async function getMarket(marketSlug: string) {
  const url = `${polkamarketsApiUrl}/markets/${marketSlug}`;
  return api.get<Market>(url);
}

export type MarketState = 'open' | 'closed' | 'resolved';

type MarketsFilters = {
  state: MarketState;
  networkId: string;
};

async function getMarkets({ state, networkId }: MarketsFilters) {
  const url = `${polkamarketsApiUrl}/markets`;
  return api.get<Market[]>(url, {
    params: pickBy(
      {
        state,
        network_id: networkId
      },
      identity
    )
  });
}

async function getMarketsByIds(ids: string[], networkId: string) {
  const url = `${polkamarketsApiUrl}/markets`;
  return api.get<Market[]>(url, {
    params: pickBy(
      {
        id: ids.join(','),
        network_id: networkId
      },
      identity
    )
  });
}

async function reloadMarket(marketSlug: string) {
  const url = `${polkamarketsApiUrl}/markets/${marketSlug}/reload`;
  return api.post(url);
}

async function createMarket(marketId: string) {
  const url = `${polkamarketsApiUrl}/markets/`;
  return api.post(url, { id: marketId });
}

export { getMarkets, getMarket, getMarketsByIds, reloadMarket, createMarket };
