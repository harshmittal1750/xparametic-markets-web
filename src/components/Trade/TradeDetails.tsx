import { useAppSelector } from 'hooks';

import MiniTable from '../MiniTable';
import { formatTradeDetails } from './Trade.utils';

function TradeDetails() {
  const { market } = useAppSelector(state => state.market);
  const { token } = market;
  const { ticker } = token;

  const { price, maxROI, maxStake } = useAppSelector(state => state.trade);

  const tableRows = formatTradeDetails({
    price,
    maxStake,
    maxROI,
    ticker
  });

  return <MiniTable rows={tableRows} />;
}

export default TradeDetails;
