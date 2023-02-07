import { Fragment, useCallback, useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import cn from 'classnames';
import type { Market as MarketInterface } from 'models/market';
import type { Action } from 'redux/ducks/polkamarkets';
import { Adornment, Container, useMedia } from 'ui';
import Spinner from 'ui/Spinner';

import {
  Tabs,
  Table,
  Text,
  SEO,
  AlertMini,
  ButtonGroup,
  RightSidebar,
  Modal,
  Button,
  VoteArrows,
  Icon
} from 'components';

import { useAppDispatch, useAppSelector, useNetwork } from 'hooks';

import marketClasses from './Market.module.scss';
import MarketAbout from './MarketAbout';
import MarketAnalytics from './MarketAnalytics';
import MarketChart from './MarketChart';
import MarketHead from './MarketHead';
import MarketNews from './MarketNews';
import MarketTitle from './MarketTitle';
import { formatMarketPositions, formatSEODescription } from './utils';

function SidebarWrapper({
  children
}: React.PropsWithChildren<Record<string, unknown>>) {
  const [show, setShow] = useState(false);
  const handleHide = useCallback(() => setShow(false), []);

  return (
    <Container $enableGutters className={marketClasses.sectionTrade}>
      <Button color="primary" size="sm" fullwidth onClick={() => setShow(true)}>
        Trade
      </Button>
      <Modal
        disableGutters
        show={show}
        onHide={handleHide}
        fullWidth
        initial={{ bottom: '-100%' }}
        animate={{ bottom: 0 }}
        exit={{ bottom: '-100%' }}
        className={{
          dialog: marketClasses.sidebarDialog
        }}
      >
        <Container $as="header" className={marketClasses.sidebarDialogHeader}>
          <Text
            scale="heading"
            fontWeight="bold"
            className={marketClasses.sidebarDialogHeaderTitle}
          >
            Select Network
          </Text>
          <Adornment $edge="end">
            <Button
              size="xs"
              variant="ghost"
              color="default"
              aria-label="Settings"
              onClick={handleHide}
            >
              <Icon name="Cross" size="lg" />
            </Button>
          </Adornment>
        </Container>
        {children}
      </Modal>
    </Container>
  );
}
function MarketBody(props: React.PropsWithChildren<Record<string, unknown>>) {
  return <div className={marketClasses.body} {...props} />;
}
function MarketUI() {
  const network = useNetwork();
  const dispatch = useAppDispatch();
  const isDesktop = useMedia('(min-width: 1024px)');
  const isSidebarVisible = useAppSelector(
    state => state.ui.rightSidebar.visible
  );
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
    market.token.symbol,
    network
  );
  const SidebarWrapperComponent = isDesktop ? Fragment : SidebarWrapper;
  const MarketBodyComponent = isDesktop ? MarketBody : Fragment;

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
      <MarketHead />
      <MarketBodyComponent>
        <Container
          $enableGutters
          className={cn({ [marketClasses.bodyContent]: isDesktop })}
        >
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
          {!isDesktop && <MarketAnalytics />}
          <MarketAbout />
          {!isDesktop && (
            <section className={marketClasses.section}>
              <MarketTitle>Vote to verify</MarketTitle>
              <VoteArrows
                size="md"
                marketId={market.id}
                marketSlug={market.slug}
                marketNetworkId={market.network.id}
                votes={market.votes}
              />
            </section>
          )}
          <section className={`pm-p-market__tabs ${marketClasses.section}`}>
            <Tabs value={tab} onChange={setTab}>
              <Tabs.TabPane tab="Positions" id="positions">
                {network.network.id !== market.networkId ? (
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
          </section>
        </Container>
        {isSidebarVisible && (
          <SidebarWrapperComponent>
            <RightSidebar />
          </SidebarWrapperComponent>
        )}
      </MarketBodyComponent>
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
      const { openTradeForm } = await import('redux/ducks/ui');
      const { getMarket, setChartViewType } = await import(
        'redux/ducks/market'
      );

      dispatch(openTradeForm());
      dispatch(getMarket(params.marketId));
      dispatch(setChartViewType('marketOverview'));
    })();

    return () => {
      (async function handleResetMarket() {
        const { reset } = await import('redux/ducks/trade');

        dispatch(reset());
      })();
    };
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
