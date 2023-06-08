import type { MarketColors, MarketColorsByNetwork } from './buildMarketColors';

export const MARKET_COLORS_KEY = 'MARKET_COLORS';

type Value = string | number;

export default function getMarketColors(
  params: Record<'network' | 'market', Value>
) {
  const marketColorsStored = localStorage.getItem(MARKET_COLORS_KEY) || '{}';
  const marketColorsParsed: MarketColorsByNetwork | Record<string, never> =
    JSON.parse(marketColorsStored);
  const marketColors: MarketColors | undefined =
    marketColorsParsed?.[params.network]?.[params.market];

  return {
    market: marketColors?.[0],
    outcome: (outcome: Value): string | undefined =>
      marketColors?.[1]?.[outcome]
  };
}
