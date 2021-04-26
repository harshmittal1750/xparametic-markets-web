import { roundNumber } from 'helpers/math';
import { Market, Outcome } from 'models/market';
import { TradeDetails } from 'redux/ducks/trade';

function formatMiniTableItems(
  action,
  predictions,
  selectedPredictionId,
  selectedMarketId,
  shares,
  price,
  maxROI,
  totalStake
) {
  const selectedPredictionObj = predictions.find(
    prediction =>
      prediction.id === selectedPredictionId &&
      prediction.marketId === selectedMarketId
  );

  const items = [
    {
      key: 'prediction',
      title: 'Prediction',
      value: selectedPredictionObj?.title || ''
    },
    {
      key: 'pricePerFraction',
      title: 'Price per share',
      value: `${roundNumber(price || selectedPredictionObj?.price || 0, 3)} ETH`
    },
    {
      key: 'shares',
      title: action === 'buy' ? 'Est. Shares bought' : 'Shares sold',
      value: roundNumber(shares, 3)
    }
  ];

  if (action === 'sell') return items;

  // adding ROI + stake items to buy action

  return [
    ...items,
    {
      key: 'roi',
      title: 'Maximum ROI',
      value: `${roundNumber(maxROI, 3)}%`
    },
    {
      key: 'stake',
      title: 'Total stake',
      value: `${roundNumber(totalStake, 3)} ETH`
    }
  ];
}

function calculateSharesBought(
  market: Market,
  outcome: Outcome,
  ethAmount: number
): TradeDetails {
  // TODO: move formulas to beprojs
  // eslint-disable-next-line prettier/prettier
  const newOutcomeShares = market.liquidity ** 2 / (market.liquidity ** 2 / outcome.shares + ethAmount);

  const shares = outcome.shares - newOutcomeShares + ethAmount || 0;
  const price = ethAmount / shares || 0;
  const maxROI = shares > 0 ? (1 / price - 1) * 100 : 0;
  const totalStake = ethAmount;
  const maxStake = shares - ethAmount;

  return {
    price,
    shares,
    maxROI,
    totalStake,
    maxStake
  };
}

function calculateEthAmountSold(market, outcome, shares): TradeDetails {
  // TODO: move formulas to beprojs
  // x = 1/2 (-sqrt(a^2 - 2 a (y + z) + 4 b + (y + z)^2) + a + y + z)
  // x = ETH amount user will receive
  // y = # shares sold
  // z = # selling shares available
  // a = # opposite shares available
  // b = product balance
  const oppositeShares = market.liquidity ** 2 / outcome.shares;

  const totalStake =
    (1 / 2) *
    (-1 *
      Math.sqrt(
        oppositeShares ** 2 -
          2 * oppositeShares * (shares + outcome.shares) +
          4 * market.liquidity ** 2 +
          (shares + outcome.shares) ** 2
      ) +
      oppositeShares +
      shares +
      outcome.shares);
  const price = totalStake / shares || 0;

  // ROI is not relevant on sell
  const maxROI = 1;
  const maxStake = 0;

  return {
    price,
    shares,
    maxROI,
    totalStake,
    maxStake
  };
}

function calculateTradeDetails(action, market, outcome, amount): TradeDetails {
  if (action === 'sell') {
    return calculateEthAmountSold(market, outcome, amount);
  }

  return calculateSharesBought(market, outcome, amount);
}

export { formatMiniTableItems, calculateTradeDetails };
