/* eslint-disable import/prefer-default-export */
import { roundNumber } from 'helpers/math';

function formatTradeDetails({ price, maxStake, maxROI, ticker }) {
  return [
    {
      key: 'probability',
      title: 'Probability',
      value: `${roundNumber(price * 100, 2)}%`
    },
    {
      key: 'payout',
      title: 'Est. Payout If Chosen',
      value: `${roundNumber(maxStake, 3)} ${ticker} (+${roundNumber(
        maxROI,
        2
      )}%)`
    }
  ];
}

export { formatTradeDetails };
