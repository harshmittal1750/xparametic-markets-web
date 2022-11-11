import { useEffect, memo, useCallback } from 'react';

import isEmpty from 'lodash/isEmpty';
import { Market } from 'models/market';
import { getFavoriteMarkets, getMarkets } from 'redux/ducks/markets';
import { useAppDispatch } from 'redux/store';

import { InfoIcon } from 'assets/icons';

import { Button } from 'components/Button';

import { useAppSelector, useFavoriteMarkets, useFooterVisibility } from 'hooks';

import PredictionCard from '../PredictionCard';
import Text from '../Text';
import VirtualizedList from '../VirtualizedList';

type MarketListAsyncProps = {
  markets: Market[];
};

const MarketListAsync = ({ markets }: MarketListAsyncProps) => {
  const dispatch = useAppDispatch();
  const { show, hide } = useFooterVisibility();
  const { isLoading, error } = useAppSelector(state => state.markets);

  const { favoriteMarkets } = useFavoriteMarkets();

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
  }, [dispatch, favoriteMarkets]);

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
