import { useAppSelector } from 'hooks';

import MiniTable from '../MiniTable';
import { formatTradeDetails } from './Trade.utils';

function TradeDetails() {
  const { market } = useAppSelector(state => state.market);
  const { outcomes, token } = market;
  const { ticker } = token;

  const { maxROI, maxStake, selectedOutcomeId } = useAppSelector(
    state => state.trade
  );

  const selectedOutcome = outcomes.find(
    outcome => outcome.id.toString() === selectedOutcomeId.toString()
  );

  const tableRows = formatTradeDetails({
    price: selectedOutcome?.price || 0,
    maxStake,
    maxROI,
    ticker
  });

  return <MiniTable rows={tableRows} />;
}

export default TradeDetails;
