export default class PolkarmarketsApiService {
  public apiUrl: string = process.env.REACT_APP_POLKAMARKETS_API_URL!;

  public async getMarkets(): Promise<any[]> {
    const url = `${this.apiUrl}/markets`;
    const response = await fetch(url);

    if (!response.ok) {
      // TODO: error handling
      return [];
    }

    return response.json();
  }

  public async getMarket(marketId: string): Promise<any> {
    const url = `${this.apiUrl}/markets/${marketId}`;
    const response = await fetch(url);

    if (!response.ok) {
      // TODO: error handling
      return [];
    }

    return response.json();
  }

  public async reloadMarket(marketId: string): Promise<any> {
    const requestOptions = { method: 'POST' };
    const url = `${this.apiUrl}/markets/${marketId}/reload`;

    const response = await fetch(url, requestOptions);

    return response.json();
  }

  public async reloadPortfolio(
    address: string,
    networkId: string
  ): Promise<any> {
    const requestOptions = { method: 'POST' };
    const url = `${this.apiUrl}/portfolios/${address}/reload?network_id=${networkId}`;

    const response = await fetch(url, requestOptions);

    return response.json();
  }

  // eslint-disable-next-line
  public async getPortfolio(address: string): Promise<any[]> {
    // TODO
    return [];
  }
}
