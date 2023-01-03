import { useAppSelector } from 'hooks';

import LiquidityForm from '../LiquidityForm';
import TradeForm from '../TradeForm';
import TradeFormClosed from '../TradeForm/TradeFormClosed';

export default function RightSidebar() {
  const visibleForm = useAppSelector(state => {
    const form = Object.keys(state.ui).filter(key => state.ui[key].visible);
    const hasSidebar = form.filter(key => key === 'rightSidebar')[0];

    return hasSidebar ? form.filter(key => key !== 'rightSidebar')[0] : '';
  });

  if (!visibleForm) return null;

  return (
    <div className="pm-l-right-sidebar">
      {
        {
          liquidityForm: <LiquidityForm />,
          reportForm: <TradeFormClosed />,
          tradeForm: <TradeForm />
        }[visibleForm]
      }
    </div>
  );
}
