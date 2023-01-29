import { useCallback, useEffect, useState } from 'react';
import { useParams, useHistory, useLocation } from 'react-router-dom';

import type { Market as MarketInterface } from 'models/market';
import type { Action } from 'redux/ducks/polkamarkets';
import { selectOutcome } from 'redux/ducks/trade';
import { Container } from 'ui';
import Spinner from 'ui/Spinner';

import {
  Tabs,
  Table,
  Text,
  SEO,
  AlertMini,
  ButtonGroup,
  RightSidebar
} from 'components';

import { useAppDispatch, useAppSelector, useNetwork } from 'hooks';

import marketClasses from './Market.module.scss';
import MarketChart from './MarketChart';
import MarketHero from './MarketHero';
import MarketNews from './MarketNews';
import { formatMarketPositions, formatSEODescription } from './utils';

function MarketUI() {
  const location = useLocation();
  const outcomeId = new URLSearchParams(location.search).get('outcome');
  const network = useNetwork();
  const dispatch = useAppDispatch();
  const actions = useAppSelector(state => state.polkamarkets.actions);
  const bondActions = useAppSelector(state => state.polkamarkets.bondActions);
  const market = useAppSelector(state => state.market.market);
  const chartViews = useAppSelector(state => state.market.chartViews);
  const [tab, setTab] = useState('positions');
  const handleChartChange = useCallback(
    async (type: string) => {
      const { setChartViewType } = await import('redux/ducks/market');

      dispatch(setChartViewType(type));
    },
    [dispatch]
  );
  const tableItems = formatMarketPositions<Action, MarketInterface['outcomes']>(
    actions.filter(action => action.marketId === +market.id),
    bondActions.filter(action => action.questionId === market.questionId),
    market.outcomes,
    market.currency.symbol || market.currency.ticker,
    network
  );

  useEffect(() => {
    if (outcomeId)
      dispatch(selectOutcome(market.id, market.networkId, +outcomeId));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [outcomeId]);

  return (
    <>
      <SEO
        title={market.title}
        description={formatSEODescription(
          market.category,
          market.subcategory,
          market.expiresAt
        )}
        image={market.bannerUrl}
      />
      <MarketHero />
      <div className={marketClasses.body}>
        <Container $enableGutters className={marketClasses.bodyContent}>
          {market.tradingViewSymbol && (
            <div className="pm-p-market__view">
              <div className="market-chart__view-selector">
                <ButtonGroup
                  buttons={chartViews}
                  defaultActiveId="marketOverview"
                  onChange={handleChartChange}
                />
              </div>
            </div>
          )}
          <MarketChart />
          {market.resolutionSource && (
            <div className="pm-p-market__source">
              <Text
                as="p"
                scale="tiny"
                fontWeight="semibold"
                style={{ margin: '0.8rem 0rem' }}
                color="lighter-gray"
              >
                Resolution source:{' '}
                <a
                  href={market.resolutionSource}
                  target="_blank"
                  className="tiny semibold text-primary"
                  rel="noreferrer"
                >
                  {market.resolutionSource}
                </a>
              </Text>
            </div>
          )}
          <div className="pm-p-market__tabs">
            <Tabs value={tab} onChange={setTab}>
              <Tabs.TabPane tab="Positions" id="positions">
                {network.network.id !== market.networkId.toString() ? (
                  <AlertMini
                    styles="outline"
                    variant="information"
                    description={`Switch network to ${market.network.name} and see your market positions.`}
                  />
                ) : (
                  <Table
                    columns={tableItems.columns}
                    rows={tableItems.rows}
                    emptyDataDescription="You have no positions."
                  />
                )}
              </Tabs.TabPane>
              <Tabs.TabPane tab="News (Beta)" id="news">
                {market.news?.length ? (
                  <MarketNews news={market.news} />
                ) : (
                  <AlertMini
                    styles="outline"
                    variant="information"
                    description="There's no news to be shown."
                  />
                )}
              </Tabs.TabPane>
            </Tabs>
          </div>
        </Container>
        <RightSidebar />
      </div>
    </>
  );
}
export default function Market() {
  const network = useNetwork();
  const history = useHistory();
  const params = useParams<Record<'marketId', string>>();
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(state => state.market.isLoading);
  const error = useAppSelector(state => state.market.error);
  const market = useAppSelector(state => state.market.market);
  const [retries, setRetries] = useState(0);

  useEffect(() => {
    (async function handleMarket() {
      const { reset } = await import('redux/ducks/trade');
      const { openTradeForm } = await import('redux/ducks/ui');
      const { getMarket, setChartViewType } = await import(
        'redux/ducks/market'
      );

      dispatch(openTradeForm());
      dispatch(reset());
      dispatch(getMarket(params.marketId));
      dispatch(setChartViewType('marketOverview'));
    })();
  }, [dispatch, params.marketId, retries]);
  useEffect(() => {
    async function handleHome() {
      const { pages } = await import('config');

      history.push(`${pages.home.pathname}?m=f`);
      window.location.reload();
    }

    if (!isLoading && error) {
      if (error.response?.status === 404) handleHome();
      else if (retries < 3) setRetries(prevRetries => prevRetries + 1);
      else handleHome();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    error,
    history,
    isLoading,
    market.id,
    market.networkId,
    network.network.id
  ]);

  if (isLoading) return <Spinner />;
  return <MarketUI />;
}
