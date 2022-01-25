import { Portfolio } from 'models/portfolio';

import api, { polkamarketsApiUrl } from './api';

async function getPortfolio(address: string, networkId: string) {
  const url = `${polkamarketsApiUrl}/portfolios/${address}?network_id=${networkId}`;
  return api.get<Portfolio>(url);
}

async function reloadPortfolio(address: string) {
  const url = `${polkamarketsApiUrl}/portfolios/${address}/reload`;
  return api.post(url);
}

export { getPortfolio, reloadPortfolio };
