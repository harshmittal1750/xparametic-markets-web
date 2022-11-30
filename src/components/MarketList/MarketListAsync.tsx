import { useEffect, memo, useCallback } from 'react';

import isEmpty from 'lodash/isEmpty';
import { Market } from 'models/market';
import { getFavoriteMarkets, getMarkets } from 'redux/ducks/markets';
import { useAppDispatch } from 'redux/store';
import { Hero, useMedia } from 'ui';

import { InfoIcon } from 'assets/icons';
import heroBanner from 'assets/images/pages/home/illuminate_fantasy_league_banner.png';
import heroLogo from 'assets/images/pages/home/illuminate_fantasy_league_logo.svg';

import { FavoriteMarketsByNetwork } from 'contexts/favoriteMarkets';

import { useAppSelector, useFooterVisibility } from 'hooks';

import { Button } from '../Button';
import PredictionCard from '../PredictionCard';
import Text from '../Text';
import VirtualizedList from '../VirtualizedList';

function MarketListHeader() {
  return (
    <Hero className="pm-p-home__hero" image={heroBanner}>
      <div className="pm-p-home__hero__content">
        <div className="pm-p-home__hero__breadcrumb">
          <Text
            as="span"
            scale="tiny-uppercase"
            fontWeight="semibold"
            color="white-50"
          >
            Illuminate Fantasy League / World Cup 2022
          </Text>
        </div>
        <Text
          as="h2"
          fontWeight="bold"
          scale="heading-large"
          color="light"
          className="pm-p-home__hero__heading"
        >
          Place your World Cup predictions to win the IFL Title!
        </Text>
        <Button
          size="sm"
          color="primary"
          onClick={() => window.open('/docs', '_blank')}
        >
          About IFL
        </Button>
      </div>
      <img
        alt="Illuminate Fantasy League"
        width={293}
        height={205}
        src={heroLogo}
      />
    </Hero>
  );
}

type MarketListAsyncProps = {
  markets: Market[];
  favoriteMarkets: FavoriteMarketsByNetwork;
};

const MarketListAsync = ({
  markets,
  favoriteMarkets
}: MarketListAsyncProps) => {
  const dispatch = useAppDispatch();
  const isDesktop = useMedia('(min-width: 1024px)');

  const { show, hide } = useFooterVisibility();
  const { isLoading, error } = useAppSelector(state => state.markets);

  const isLoadingMarkets = Object.values(isLoading).some(
    state => state === true
  );

  const hasError = Object.values(error).some(
    state => state !== null && state.message !== 'canceled'
  );

  const fetchMarkets = useCallback(async () => {
    dispatch(getMarkets('open'));
    dispatch(getMarkets('closed'));
    dispatch(getMarkets('resolved'));
    dispatch(getFavoriteMarkets(favoriteMarkets));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  useEffect(() => {
    fetchMarkets();
  }, [fetchMarkets]);

  useEffect(() => {
    if (!isEmpty(markets)) {
      hide();
    }
    return () => show();
  }, [dispatch, markets, hide, show]);

  const refreshMarkets = useCallback(() => {
    fetchMarkets();
  }, [fetchMarkets]);

  const setFooterVisibility = useCallback(
    (atBottom: boolean) => (atBottom ? show() : hide()),
    [hide, show]
  );

  if (isLoadingMarkets)
    return (
      <div className="pm-c-market-list__empty-state">
        <div className="pm-c-market-list__empty-state__body">
          <span className="spinner--primary" />
        </div>
      </div>
    );

  if (hasError) {
    return (
      <div className="pm-c-market-list__error">
        <div className="pm-c-market-list__error__body">
          <InfoIcon />
          <Text
            as="p"
            scale="tiny"
            fontWeight="semibold"
            className="pm-c-market-list__empty-state__body-description"
          >
            Error fetching markets
          </Text>
        </div>
        <div className="pm-c-market-list__error__actions">
          <Button color="primary" size="sm" onClick={refreshMarkets}>
            Try again
          </Button>
        </div>
      </div>
    );
  }

  if (isEmpty(markets)) {
    return (
      <div className="pm-c-market-list__empty-state">
        <div className="pm-c-market-list__empty-state__body">
          <InfoIcon />
          <Text
            as="p"
            scale="tiny"
            fontWeight="semibold"
            className="pm-c-market-list__empty-state__body-description"
          >
            There are no available markets for this category.
          </Text>
        </div>
      </div>
    );
  }

  return (
    <div className="pm-c-market-list">
      <VirtualizedList
        components={{ Header: isDesktop ? MarketListHeader : undefined }}
        height="100%"
        data={markets}
        itemContent={(_index, market) => (
          <div className="pm-c-market-list__item">
            <PredictionCard market={market} />
          </div>
        )}
        atBottom={atBottom => setFooterVisibility(atBottom)}
      />
    </div>
  );
};

export default memo(MarketListAsync);
