import { useCallback, useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import dayjs from 'dayjs';
import type { Market as MarketInterface } from 'models/market';
import type { Action } from 'redux/ducks/polkamarkets';
import { Container } from 'ui';
import Spinner from 'ui/Spinner';

import { ArrowLeftIcon } from 'assets/icons';

import {
  Tabs,
  Table,
  Text,
  Button,
  SEO,
  VoteArrows,
  AlertMini
} from 'components';

import { useAppDispatch, useAppSelector, useNetwork } from 'hooks';

import MarketAnalytics from './MarketAnalytics';
import MarketChart from './MarketChart';
import MarketChartViewSelector from './MarketChartViewSelector';
import MarketHead from './MarketHead';
import MarketNews from './MarketNews';
import MarketStats from './MarketStats';
import { formatMarketPositions, formatSEODescription } from './utils';

function MarketUI() {
  const history = useHistory();
  const network = useNetwork();
  const dispatch = useAppDispatch();
  const actions = useAppSelector(state => state.polkamarkets.actions);
  const bondActions = useAppSelector(state => state.polkamarkets.bondActions);
  const market = useAppSelector(state => state.market.market);
  const [tab, setTab] = useState('positions');
  const handleBack = useCallback(async () => {
    const { pages } = await import('config');
    const { reset } = await import('redux/ducks/trade');
    const { closeRightSidebar } = await import('redux/ducks/ui');

    dispatch(closeRightSidebar());
    history.push(pages.home.pathname);
    dispatch(reset());
  }, [dispatch, history]);
  const tableItems = formatMarketPositions<Action, MarketInterface['outcomes']>(
    actions.filter(action => action.marketId === -market.id),
    bondActions.filter(action => action.questionId === market.questionId),
    market.outcomes,
    market.currency.symbol || market.currency.ticker,
    network
  );

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
      <Container className="pm-p-market">
        <div className="pm-p-market__analytics">
          <MarketAnalytics
            liquidity={market.liquidity}
            volume={market.volume}
            expiration={dayjs(market.expiresAt)
              .utc()
              .format('YYYY-MM-DD HH:mm UTC')}
          />
        </div>
        <div className="pm-p-market__market">
          <MarketHead
            isVerified={market.verified}
            section={market.category}
            subsection={market.subcategory}
            imageUrl={market.imageUrl}
            description={market.title}
          />
          <div className="pm-p-market__actions">
            <VoteArrows
              key={market.slug}
              size="md"
              marketId={market.id}
              marketNetworkId={market.networkId}
              marketSlug={market.slug}
              votes={market.votes}
            />
            <Button variant="outline" size="sm" onClick={handleBack}>
              <ArrowLeftIcon />
              Back to Markets
            </Button>
          </div>
        </div>
        {market.tradingViewSymbol && (
          <div className="pm-p-market__view">
            <MarketChartViewSelector />
          </div>
        )}
        <div className="pm-p-market__charts">
          <MarketChart />
        </div>
        <div className="pm-p-market__stats">
          <MarketStats
            currency={market.currency}
            outcomes={market.outcomes}
            state={market.state}
            title={market.title}
          />
        </div>
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
    </>
  );
}
export default function Market() {
  const history = useHistory();
  const params = useParams<Record<'marketId', string>>();
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(state => state.market.isLoading);
  const error = useAppSelector(state => state.market.error);
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
      if (error?.response?.status === 404) handleHome();
      else if (retries < 3) setRetries(prevRetries => prevRetries + 1);
      else handleHome();
    }
  }, [history, error, isLoading, retries]);

  if (isLoading) return <Spinner />;
  return <MarketUI />;
}
