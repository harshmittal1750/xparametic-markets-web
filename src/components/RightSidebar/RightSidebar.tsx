import { ui as configUI } from 'config';
import { Container } from 'ui';

import { useMarketForms } from 'hooks';

import LiquidityForm from '../LiquidityForm';
import ReportForm from '../ReportForm';
import TradeForm from '../TradeForm';
import TradeFormClosed from '../TradeForm/TradeFormClosed';
import rightSidebarClasses from './RightSidebar.module.scss';

const forms = {
  liquidityForm: <LiquidityForm />,
  reportForm: configUI.reportForm.enabled ? (
    <ReportForm />
  ) : (
    <TradeFormClosed />
  ),
  tradeForm: <TradeForm />
};

export default function RightSidebar() {
  const form = useMarketForms();

  return (
    <Container $enableGutters className={rightSidebarClasses.root}>
      {forms[form]}
    </Container>
  );
}
