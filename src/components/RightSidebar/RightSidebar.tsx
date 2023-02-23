import * as config from 'config';
import { Container, useRect } from 'ui';

import { useAppSelector } from 'hooks';

import LiquidityForm from '../LiquidityForm';
import ReportForm from '../ReportForm';
import TradeForm from '../TradeForm';
import TradeFormClosed from '../TradeForm/TradeFormClosed';

export default function RightSidebar() {
  const ui = useAppSelector(state => state.ui);
  const [ref, rect] = useRect();
  const [form] = Object.keys(ui).filter(
    key => /Form/.test(key) && ui[key].visible
  );

  return (
    <Container
      ref={ref}
      $enableGutters
      className="pm-l-right-sidebar"
      style={
        {
          '--min-height': `calc(100vh - ${rect.top}px - 48px)`
        } as React.CSSProperties
      }
    >
      {
        {
          liquidityForm: <LiquidityForm />,
          reportForm: config.ui.reportForm.enabled ? (
            <ReportForm />
          ) : (
            <TradeFormClosed />
          ),
          tradeForm: <TradeForm />
        }[form]
      }
    </Container>
  );
}
