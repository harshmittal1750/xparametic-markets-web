import { useAppSelector } from 'hooks';

import MiniTable from '../MiniTable';
import { formatTradeDetails } from './Trade.utils';

function TradeDetails() {
  const { market } = useAppSelector(state => state.market);
  const { outcomes, token } = market;
  const { ticker } = token;

  const {
    type,
    maxROI,
    maxStake,
    shares,
    selectedOutcomeId,
    priceTo,
    totalStake
  } = useAppSelector(state => state.trade);

  const selectedOutcome = outcomes.find(
    outcome => outcome.id.toString() === selectedOutcomeId.toString()
  );

  const tableRows = formatTradeDetails({
    type,
    priceFrom: selectedOutcome?.price || 0,
    priceTo,
    maxStake,
    maxROI,
    shares,
    ticker,
    totalStake
  });

  return <MiniTable rows={tableRows} />;
}

export default TradeDetails;
