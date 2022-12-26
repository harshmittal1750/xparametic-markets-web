import { useEffect, memo, useCallback } from 'react';

import { Market } from 'models/market';
import { getFavoriteMarkets, getMarkets } from 'redux/ducks/markets';
import { useAppDispatch } from 'redux/store';

import { InfoIcon } from 'assets/icons';

import { FavoriteMarketsByNetwork } from 'contexts/favoriteMarkets';

import { useAppSelector } from 'hooks';

import { Button } from '../Button';
import Text from '../Text';
import MarketList from './MarketList';

type MarketListAsyncProps = {
  markets: Market[];
  favoriteMarkets: FavoriteMarketsByNetwork;
};

const MarketListAsync = ({
  markets,
  favoriteMarkets
}: MarketListAsyncProps) => {
  const dispatch = useAppDispatch();
  const { isLoading, error } = useAppSelector(state => ({
    isLoading: Object.values(state.markets.isLoading).some(Boolean),
    error: Object.values(state.markets.error).some(
      value => value !== null && value.message !== 'canceled'
    )
  }));
  const handleMarkets = useCallback(async () => {
    dispatch(getMarkets('open'));
    dispatch(getMarkets('closed'));
    dispatch(getMarkets('resolved'));
    dispatch(getFavoriteMarkets(favoriteMarkets));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  useEffect(() => {
    handleMarkets();
  }, [handleMarkets]);

  if (isLoading)
    return (
      <div className="pm-c-market-list__empty-state">
        <div className="pm-c-market-list__empty-state__body">
          <span className="spinner--primary" />
        </div>
      </div>
    );

  if (error) {
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
          <Button color="primary" size="sm" onClick={handleMarkets}>
            Try again
          </Button>
        </div>
      </div>
    );
  }

  if (!markets.length) {
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

  return <MarketList markets={markets} />;
};

export default memo(MarketListAsync);
