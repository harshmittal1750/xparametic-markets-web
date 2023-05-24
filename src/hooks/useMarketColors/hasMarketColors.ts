import type { MarketColorsByNetwork } from './buildMarketColors';

export default function hasMarketColors(
  params: unknown
): params is MarketColorsByNetwork {
  if (params === null || typeof params !== 'object') return false;

  // eslint-disable-next-line no-restricted-syntax
  for (const networkId in params) {
    if (Object.prototype.hasOwnProperty.call(params, networkId)) {
      const market = params[networkId];

      if (market === null || typeof market !== 'object') return false;

      // eslint-disable-next-line no-restricted-syntax
      for (const marketId in market) {
        if (Object.prototype.hasOwnProperty.call(market, marketId)) {
          const marketColors = market[marketId];

          if (!Array.isArray(marketColors)) return false;

          // eslint-disable-next-line no-restricted-syntax
          for (const [marketColor, outcomeColors] of marketColors) {
            if (typeof marketColor !== 'string') return false;

            if (outcomeColors === null || typeof outcomeColors !== 'object')
              return false;

            // eslint-disable-next-line no-restricted-syntax
            for (const outcomeId in outcomeColors) {
              if (
                Object.prototype.hasOwnProperty.call(outcomeColors, outcomeId)
              ) {
                const outcomeColor = outcomeColors[outcomeId];

                return typeof outcomeColor === 'string';
              }
            }
          }
        }
      }
    }
  }

  return false;
}
