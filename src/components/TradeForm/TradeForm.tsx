import { useEffect } from 'react';

import { ui } from 'config';
import { selectOutcome } from 'redux/ducks/trade';
import { openReportForm } from 'redux/ducks/ui';
import { useTheme } from 'ui';

import Text from 'components/Text';

import { useAppDispatch, useAppSelector } from 'hooks';

import Feature from '../Feature';
import tradeFormClasses from './TradeForm.module.scss';
import TradeFormActions from './TradeFormActions';
import TradeFormClosed from './TradeFormClosed';
import TradeFormDetails from './TradeFormDetails';
import TradeFormInput from './TradeFormInput';
import TradeFormLiquidity from './TradeFormLiquidity';
import TradeFormPredictions from './TradeFormPredictions';
import TradeFormTypeSelector from './TradeFormTypeSelector';

function TradeForm() {
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const { id, networkId, outcomes } = useAppSelector(
    state => state.market.market
  );

  const marketState = useAppSelector(state => state.market.market.state);
  const selectedMarketId = useAppSelector(
    state => state.trade.selectedMarketId
  );
  const isLoadingMarket = useAppSelector(state => state.market.isLoading);

  useEffect(() => {
    if (marketState === 'closed') {
      dispatch(openReportForm());
    }
  }, [dispatch, marketState]);

  useEffect(() => {
    if (id !== selectedMarketId) {
      dispatch(selectOutcome(id, networkId, outcomes[0].id));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoadingMarket) return null;

  if (marketState !== 'open') return <TradeFormClosed />;

  return (
    <div className="pm-c-trade-form">
      <div className="pm-c-trade-form__view">
        {ui.tradeForm.liquidity && (
          <>
            {theme.device.isDesktop && (
              <Text
                scale="tiny-uppercase"
                className={tradeFormClasses.title}
                fontWeight="semibold"
              >
                Select outcome
              </Text>
            )}
            <TradeFormPredictions />
          </>
        )}
      </div>
      <div className="pm-c-trade-form__actions">
        <Feature name="regular">
          <TradeFormLiquidity />
        </Feature>
        <TradeFormTypeSelector />
        <TradeFormInput />
        <TradeFormDetails />
        <TradeFormActions />
      </div>
    </div>
  );
}

export default TradeForm;
