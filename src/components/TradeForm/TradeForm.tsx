import { useEffect } from 'react';

import { selectOutcome } from 'redux/ducks/trade';
import { openReportForm } from 'redux/ducks/ui';

import { useAppDispatch, useAppSelector } from 'hooks';

import TradeFormActions from './TradeFormActions';
import TradeFormCharts from './TradeFormCharts';
import TradeFormClosed from './TradeFormClosed';
import TradeFormDetails from './TradeFormDetails';
import TradeFormInput from './TradeFormInput';
import TradeFormPredictions from './TradeFormPredictions';
import TradeFormTypeSelector from './TradeFormTypeSelector';

function TradeForm() {
  const dispatch = useAppDispatch();

  const { id, networkId, outcomes } = useAppSelector(
    state => state.market.market
  );
  const marketState = useAppSelector(state => state.market.market.state);
  const selectedMarketId = useAppSelector(
    state => state.trade.selectedMarketId
  );
  const isLoadingMarket = useAppSelector(state => state.market.isLoading);

  const isCurrentSelectedMarket = id === selectedMarketId;

  useEffect(() => {
    if (marketState === 'closed') {
      dispatch(openReportForm());
    }
  }, [dispatch, marketState]);

  useEffect(() => {
    if (!isCurrentSelectedMarket) {
      dispatch(selectOutcome(id, networkId, outcomes[0].id));
    }
  }, [isCurrentSelectedMarket, dispatch, id, outcomes, networkId]);

  if (isLoadingMarket) return null;

  if (marketState !== 'open') return <TradeFormClosed />;

  return (
    <div className="pm-c-trade-form">
      <div className="pm-c-trade-form__group" style={{ gap: '1.6rem' }}>
        <TradeFormCharts />
        <TradeFormPredictions />
      </div>
      <div className="pm-c-trade-form__group" style={{ gap: '2.4rem' }}>
        <TradeFormTypeSelector />
        <TradeFormInput />
        <TradeFormDetails />
        <TradeFormActions />
      </div>
    </div>
  );
}

export default TradeForm;
