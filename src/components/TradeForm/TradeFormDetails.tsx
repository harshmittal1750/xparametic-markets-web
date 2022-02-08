import { roundNumber } from 'helpers/math';

import { useAppSelector, useNetwork } from 'hooks';

import MiniTable from '../MiniTable';
import { formatMiniTableItems } from './utils';

function TradeFormDetails() {
  const { market } = useAppSelector(state => state.market);
  const {
    network: { currency }
  } = useNetwork();
  const { ticker } = currency;
  const selectedOutcomeId = useAppSelector(
    state => state.trade.selectedOutcomeId
  );
  const { id, outcomes } = market;
  const { type, shares, price, maxROI, totalStake, maxStake, fee } =
    useAppSelector(state => state.trade);

  const miniTableItems = formatMiniTableItems(
    type,
    ticker,
    market,
    outcomes,
    selectedOutcomeId,
    id,
    shares,
    price,
    maxROI,
    totalStake,
    fee
  );

  return (
    <div className="pm-c-trade-form-details">
      <MiniTable rows={miniTableItems} style={{ paddingBottom: '0.4rem' }} />
      {type === 'buy' ? (
        <MiniTable
          rows={[
            {
              key: 'buy-stake',
              title: 'Potential returns',
              value: `${roundNumber(maxStake, 3)} ${ticker}`
            }
          ]}
          color="success"
        />
      ) : null}
      {type === 'sell' ? (
        <MiniTable
          rows={[
            {
              key: 'sell-stake',
              title: 'Total stake',
              value: `${roundNumber(totalStake, 3)} ${ticker}`
            }
          ]}
          color="danger"
        />
      ) : null}
    </div>
  );
}

TradeFormDetails.displayName = 'TradeFormDetails';

export default TradeFormDetails;
