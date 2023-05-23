import { useCallback, useEffect } from 'react';

import type { Market } from 'models/market';
import { getAverageColor } from 'ui';

import useAppSelector from 'hooks/useAppSelector';
import usePrevious from 'hooks/usePrevious';

const MARKET_COLORS = 'MARKET_COLORS';
const MARKET_COLORS_DEFAULT = '{}';

type OutcomeColors = Record<number, string>;
type MarketColors = [string, Partial<OutcomeColors>];
type MarketsColors = Record<
  number,
  Record<number, Partial<Record<number, MarketColors>>>
>;
type UseMarketsColorsProps = {
  markets?: Market[];
};

async function getMarketsColors<
  O = Record<number, string>,
  M = Record<
    number,
    Record<number, Partial<Record<number, [string, Partial<O>]>>>
  >
>(data: Array<Market>) {
  let marketColors = {} as M;

  // eslint-disable-next-line no-restricted-syntax
  for await (const market of data) {
    let outcomesColors = {} as O;

    // eslint-disable-next-line no-restricted-syntax
    for await (const outcome of market.outcomes) {
      outcomesColors = {
        ...outcomesColors,
        [outcome.id]: await getAverageColor(outcome.imageUrl)
      };
    }

    marketColors = {
      ...marketColors,
      [market.network.id]: {
        ...marketColors[market.network.id],
        [market.id]: [await getAverageColor(market.imageUrl), outcomesColors]
      }
    };
  }

  return marketColors;
}
export default function useMarketsColors({
  markets
}: UseMarketsColorsProps = {}) {
  const market = useAppSelector(state => state.market.market);
  const marketColorsStored = localStorage.getItem(MARKET_COLORS);
  const marketsColors: MarketsColors | Record<string, never> = JSON.parse(
    marketColorsStored || MARKET_COLORS_DEFAULT
  );
  const marketColor = marketsColors?.[market.network.id]?.[market.id];
  const prevMarketsColors = usePrevious(marketColorsStored);
  const handleOutcomeColor = useCallback(
    (id: number): string => marketColor?.[1]?.[id]?.join(' '),
    [marketColor]
  );

  useEffect(() => {
    (async function handleMarketsColors() {
      if (!markets) return null;

      try {
        const marketColordStoring = JSON.stringify(
          await getMarketsColors([...markets])
        );

        if (
          Object.keys(marketsColors).length &&
          marketColordStoring === marketColorsStored
        )
          return null;

        localStorage.setItem(
          MARKET_COLORS,
          JSON.stringify(await getMarketsColors([...markets]))
        );
      } catch (error) {
        // unsupported
      }

      return null;
    })();
  }, [marketColorsStored, markets, marketsColors, prevMarketsColors]);

  return {
    market: marketColor?.[0]?.join(' '),
    outcome: handleOutcomeColor
  };
}
