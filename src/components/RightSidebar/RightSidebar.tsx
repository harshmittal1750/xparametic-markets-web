import { ui as configUI, features } from 'config';
import { Container } from 'ui';

import { useMarketForms } from 'hooks';

import LiquidityForm from '../LiquidityForm';
import ReportForm from '../ReportForm';
import Trade from '../Trade';
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
  tradeForm: features.fantasy.enabled ? <Trade /> : <TradeForm />
};

export default function RightSidebar() {
  const form = useMarketForms();

  return (
    <Container $enableGutters className={rightSidebarClasses.root}>
      {forms[form]}
    </Container>
  );
}
