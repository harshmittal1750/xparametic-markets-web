/* eslint-disable import/prefer-default-export */
import { roundNumber } from 'helpers/math';

function formatTradeDetails({ type, price, maxStake, maxROI, shares, ticker }) {
  return [
    {
      key: 'probability',
      title: 'Probability',
      value: `${roundNumber(price * 100, 2)}%`
    },
    type === 'buy'
      ? {
          key: 'payout',
          title: 'Max Payout',
          value: `${roundNumber(maxStake, 3)} ${ticker} (+${roundNumber(
            maxROI,
            2
          )}%)`
        }
      : {
          key: 'shares',
          title: 'Shares sold',
          value: roundNumber(shares, 3)
        }
  ];
}

export { formatTradeDetails };
