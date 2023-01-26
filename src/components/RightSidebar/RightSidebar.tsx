import { Container } from 'ui';

import { useAppSelector } from 'hooks';

import LiquidityForm from '../LiquidityForm';
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

  if (reportFormIsVisible) return <TradeFormClosed />;

  return null;
}
export default function RightSidebar() {
  const rightSidebarIsVisible = useAppSelector(
    state => state.ui.rightSidebar.visible
  );

  if (!rightSidebarIsVisible) return null;

  return (
    <Container $enableGutters className="pm-l-right-sidebar">
      <Sidebar />
    </Container>
  );
}
