import { ui as configUI } from 'config';
import { Container } from 'ui';

import { useAppSelector } from 'hooks';

import LiquidityForm from '../LiquidityForm';
import ReportForm from '../ReportForm';
import TradeForm from '../TradeForm';
import TradeFormClosed from '../TradeForm/TradeFormClosed';
import rightSidebarClasses from './RightSidebar.module.scss';

export default function RightSidebar() {
  const ui = useAppSelector(state => state.ui);
  const [form] = Object.keys(ui).filter(
    key => /Form/.test(key) && ui[key].visible
  );

  return (
    <Container $enableGutters className={rightSidebarClasses.root}>
      {
        {
          liquidityForm: <LiquidityForm />,
          reportForm: configUI.reportForm.enabled ? (
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
