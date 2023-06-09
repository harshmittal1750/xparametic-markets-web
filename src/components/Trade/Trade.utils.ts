/* eslint-disable import/prefer-default-export */
import { roundNumber } from 'helpers/math';

function formatTradeDetails({ price, maxStake, maxROI, ticker }) {
  return [
    {
      key: 'probability',
      title: 'Probability',
      value: `${price * 100}%`
    },
    {
      key: 'payout',
      title: 'Est. Payout If Chosen',
      value: `${roundNumber(maxStake, 3)} ${ticker} (+${roundNumber(
        maxROI,
        3
      )}%)`
    }
  ];
}

export { formatTradeDetails };
