import { Container, useRect } from 'ui';

import { useAppSelector } from 'hooks';

import LiquidityForm from '../LiquidityForm';
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
      style={{
        minHeight: `calc(100vh - ${rect.top}px - 48px)`
      }}
    >
      {
        {
          liquidityForm: <LiquidityForm />,
          reportForm: <TradeFormClosed />,
          tradeForm: <TradeForm />
        }[form]
      }
    </Container>
  );
}
