import type { Market } from 'models/market';
import { getAverageColor } from 'ui';

type Color = string;
type OutcomeColors = Record<number, Color>;
export type MarketColors = [Color, OutcomeColors];
export type MarketColorsByNetwork = Record<
  number,
  Record<number, MarketColors>
>;

export default async function buildMarketsColors(
  data: ReadonlyArray<Market>
): Promise<MarketColorsByNetwork> {
  let marketColors: MarketColorsByNetwork = {
    0: {
      0: [
        '',
        {
          0: ''
        }
      ]
    }
  };

  // eslint-disable-next-line no-restricted-syntax
  for await (const market of data) {
    let outcomesColors: OutcomeColors = {
      0: ''
    };

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
