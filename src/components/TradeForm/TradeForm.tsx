import { useEffect } from 'react';

import { ui } from 'config';
import { selectOutcome } from 'redux/ducks/trade';
import { openReportForm } from 'redux/ducks/ui';

import Text from 'components/Text';

import { useAppDispatch, useAppSelector, useMarketPath } from 'hooks';

import TradeFormActions from './TradeFormActions';
import TradeFormCharts from './TradeFormCharts';
import TradeFormClosed from './TradeFormClosed';
import TradeFormDetails from './TradeFormDetails';
import TradeFormInput from './TradeFormInput';
import TradeFormPredictions from './TradeFormPredictions';
import TradeFormTypeSelector from './TradeFormTypeSelector';

function TradeForm() {
  const marketPath = useMarketPath();
  const dispatch = useAppDispatch();
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
        <TradeFormCharts />
        {ui.tradeForm.liquidity && marketPath && (
          <>
            <Text scale="tiny-uppercase" color="white-50" fontWeight="semibold">
              Select outcome
            </Text>
            <TradeFormPredictions />
          </>
        )}
      </div>
      <div className="pm-c-trade-form__actions">
        <TradeFormTypeSelector />
        <TradeFormInput />
        <TradeFormDetails />
        <TradeFormActions />
      </div>
    </div>
  );
}

export default TradeForm;
