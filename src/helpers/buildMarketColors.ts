import type { Market } from 'models/market';

type Color = string;
type OutcomeColors = Record<number, Color>;
export type MarketColors = [Color, OutcomeColors];
export type MarketColorsByNetwork = Record<
  number,
  Record<number, MarketColors>
>;

export default async function buildMarketColors(
  data: ReadonlyArray<Market>
): Promise<MarketColorsByNetwork> {
  const { getAverageColor } = await import('ui');

  let marketColors: MarketColorsByNetwork = {};

  // eslint-disable-next-line no-restricted-syntax
  for await (const market of data) {
    let outcomesColors: OutcomeColors = {};

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
