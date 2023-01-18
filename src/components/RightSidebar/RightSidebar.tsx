import { ui } from 'config';

import { useAppSelector } from 'hooks';

import LiquidityForm from '../LiquidityForm';
import ReportForm from '../ReportForm';
import TradeForm from '../TradeForm';
import TradeFormClosed from '../TradeForm/TradeFormClosed';

function Sidebar() {
  const tradeFormIsVisible = useAppSelector(
    state => state.ui.tradeForm.visible
  );
  const liquidityFormIsVisible = useAppSelector(
    state => state.ui.liquidityForm.visible
  );
  const reportFormIsVisible = useAppSelector(
    state => state.ui.reportForm.visible
  );

  if (tradeFormIsVisible) return <TradeForm />;

  if (liquidityFormIsVisible) return <LiquidityForm />;

  if (ui.reportForm.enabled && reportFormIsVisible) return <ReportForm />;

  if (!ui.reportForm.enabled && reportFormIsVisible) return <TradeFormClosed />;

  return null;
}
export default function RightSidebar() {
  const rightSidebarIsVisible = useAppSelector(
    state => state.ui.rightSidebar.visible
  );

  if (!rightSidebarIsVisible) return null;

  return (
    <div className="pm-l-right-sidebar border-left-thin p-grid height-viewport o-hidden flex-shrink-0 overflow-y-auto">
      <Sidebar />
    </div>
  );
}
