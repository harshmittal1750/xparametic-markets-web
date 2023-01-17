import { useCallback, useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import type { Market as MarketInterface } from 'models/market';
import type { Action } from 'redux/ducks/polkamarkets';
import { Container, Hero } from 'ui';
import Avatar from 'ui/Avatar';
import Spinner from 'ui/Spinner';

import { ArrowLeftIcon } from 'assets/icons';

import {
  Tabs,
  Table,
  Text,
  Button,
  SEO,
  VoteArrows,
  AlertMini,
  Breadcrumb,
  ButtonGroup
} from 'components';
import MarketFooter from 'components/Market/MarketFooter';

import { useAppDispatch, useAppSelector, useNetwork } from 'hooks';

import marketClasses from './Market.module.scss';
import MarketChart from './MarketChart';
import MarketNews from './MarketNews';
import MarketStats from './MarketStats';
import { formatMarketPositions, formatSEODescription } from './utils';

function MarketUI() {
  const network = useNetwork();
  const dispatch = useAppDispatch();
  const actions = useAppSelector(state => state.polkamarkets.actions);
  const bondActions = useAppSelector(state => state.polkamarkets.bondActions);
  const { chartViews, market } = useAppSelector(state => state.market);
  const [tab, setTab] = useState('positions');
  const handleChartChange = useCallback(
    async (type: string) => {
      const { setChartViewType } = await import('redux/ducks/market');

      dispatch(setChartViewType(type));
    },
    [dispatch]
  );
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
      <Hero className={marketClasses.hero} $image={market.imageUrl}>
        <Container className={marketClasses.heroInfo}>
          <Avatar $size="lg" alt="Market" src={market.imageUrl} />
          <div>
            <Breadcrumb>
              <Breadcrumb.Item>{market.category}</Breadcrumb.Item>
              <Breadcrumb.Item>{market.subcategory}</Breadcrumb.Item>
            </Breadcrumb>
            <Text as="h2" fontWeight="bold" scale="heading-large" color="light">
              {market.title}
            </Text>
          </div>
          <div className={marketClasses.heroInfoActions}>
            <Button variant="subtle" size="sm">
              <ArrowLeftIcon />
            </Button>
            <Button variant="subtle" size="sm">
              <ArrowLeftIcon />
            </Button>
          </div>
        </Container>
        <Container className={marketClasses.heroStats}>
          <MarketFooter market={market} />
        </Container>
      </Hero>
      <Container>
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
        <div className={`pm-p-market__tabs ${marketClasses.tabs}`}>
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
      if (error.response?.status === 404) handleHome();
      else if (retries < 3) setRetries(prevRetries => prevRetries + 1);
      else handleHome();
    }
  }, [history, error, isLoading, retries]);

  if (isLoading) return <Spinner />;
  return <MarketUI />;
}
