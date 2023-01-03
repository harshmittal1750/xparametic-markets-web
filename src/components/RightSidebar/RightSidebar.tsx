import { useAppSelector } from 'hooks';

import LiquidityForm from '../LiquidityForm';
import TradeForm from '../TradeForm';
import TradeFormClosed from '../TradeForm/TradeFormClosed';

export default function RightSidebar() {
  const form = useAppSelector(
    state =>
      Object.keys(state.ui)
        .filter(key => state.ui[key].visible)
        .filter(key => key !== 'rightSidebar')[0]
  );

  if (!form) return null;

  return (
    <aside className="pm-l-layout__aside">
      <div className="pm-l-right-sidebar">
        {
          {
            liquidityForm: <LiquidityForm />,
            reportForm: <TradeFormClosed />,
            tradeForm: <TradeForm />
          }[form]
        }
      </div>
    </aside>
  );
}
