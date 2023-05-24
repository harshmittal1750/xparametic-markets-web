import { useCallback, useEffect } from 'react';

import type { Market } from 'models/market';

import useAppSelector from 'hooks/useAppSelector';

import type { MarketColors, MarketColorsByNetwork } from './buildMarketsColors';

const MARKET_COLORS_KEY = 'MARKET_COLORS';
const MARKET_COLORS_COUNT = {
  count: 0
};

export default function useMarketsColors(markets?: ReadonlyArray<Market>) {
  const market = useAppSelector(state => state.market.market);
  const marketsColorsStored = localStorage.getItem(MARKET_COLORS_KEY) || '{}';
  const marketsColorsParsed: MarketColorsByNetwork | Record<string, never> =
    JSON.parse(marketsColorsStored);
  const marketColors: MarketColors | undefined =
    marketsColorsParsed?.[market.network.id]?.[market.id];
  const handleOutcomeColor = useCallback(
    (id: number) => marketColors?.[1]?.[id]?.join(' '),
    [marketColors]
  );

  useEffect(() => {
    (async function handleMarketsColors() {
      MARKET_COLORS_COUNT.count += 1;

      if (MARKET_COLORS_COUNT.count > 1 || !markets) return null;

      try {
        const { default: buildMarketsColors } = await import(
          './buildMarketsColors'
        );
        const marketsColors = JSON.stringify(await buildMarketsColors(markets));

        if (marketsColors === marketsColorsStored) return null;

        localStorage.setItem(MARKET_COLORS_KEY, marketsColors);
      } catch (error) {
        // unsupported
      }

      return null;
    })();
  }, [marketsColorsStored, markets]);

  return {
    market: marketColors?.[0]?.join(' '),
    outcome: handleOutcomeColor
  };
}
