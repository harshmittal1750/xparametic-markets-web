import type { Market } from 'models/market';
import { getAverageColor } from 'ui';

type Color = Array<number>; // [2,2,2]
type OutcomeColors = Record<number, Color>; // {1:[2,2,2]}
export type MarketColors = [Color, OutcomeColors]; // [[2,2,2],{1:[2,2,2]}]
export type MarketColorsByNetwork = Record<
  number,
  Record<number, MarketColors>
>; // {1:{1:[[2,2,2],{1:[2,2,2]}]}}

export default async function buildMarketsColors(
  data: ReadonlyArray<Market>
): Promise<MarketColorsByNetwork> {
  let marketColors = {} as MarketColorsByNetwork;

  // eslint-disable-next-line no-restricted-syntax
  for await (const market of data) {
    let outcomesColors = {} as OutcomeColors;

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
