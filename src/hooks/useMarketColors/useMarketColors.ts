import { useCallback, useEffect } from 'react';

import type { Market } from 'models/market';

import useAppSelector from 'hooks/useAppSelector';

import type { MarketColors, MarketColorsByNetwork } from './buildMarketColors';

const MARKET_COLORS_KEY = 'MARKET_COLORS';
const MARKET_COLORS_COUNT = {
  count: 0
};

export default function useMarketColors(markets?: ReadonlyArray<Market>) {
  const market = useAppSelector(state => state.market.market);
  const marketColorsStored = localStorage.getItem(MARKET_COLORS_KEY) || '{}';
  const marketColorsParsed: MarketColorsByNetwork | Record<string, never> =
    JSON.parse(marketColorsStored);
  const marketColors: MarketColors | undefined =
    marketColorsParsed?.[market.network.id]?.[market.id];
  const handleOutcomeColor = useCallback(
    (id: number) => marketColors?.[1]?.[id],
    [marketColors]
  );

  useEffect(() => {
    (async function handleMarketColors() {
      MARKET_COLORS_COUNT.count += 1;

      if (MARKET_COLORS_COUNT.count > 1 || !markets) return null;

      try {
        const { default: buildMarketColors } = await import(
          './buildMarketColors'
        );
        const marketColorsStoring = JSON.stringify(
          await buildMarketColors(markets)
        );

        if (marketColorsStoring === marketColorsStored) return null;

        localStorage.setItem(MARKET_COLORS_KEY, marketColorsStoring);
      } catch (error) {
        // unsupported
      }

      return null;
    })();
  }, [marketColorsStored, markets]);

  return {
    market: marketColors?.[0],
    outcome: handleOutcomeColor
  };
}
