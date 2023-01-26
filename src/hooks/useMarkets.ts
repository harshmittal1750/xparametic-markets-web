import { useCallback } from 'react';

import {
  getFavoriteMarkets,
  getMarkets,
  marketsSelector
} from 'redux/ducks/markets';
import { useAppDispatch } from 'redux/store';

import useAppSelector from './useAppSelector';
import useFavoriteMarkets from './useFavoriteMarkets';
import useFilters from './useFilters';

export default function useMarkets() {
  const dispatch = useAppDispatch();
  const filters = useFilters();
  const favoriteMarkets = useFavoriteMarkets();
  const markets = useAppSelector(state =>
    marketsSelector({
      state: state.markets,
      filters: {
        ...filters.selected.dropdowns,
        favorites: {
          checked: filters.state.favorites.checked,
          marketsByNetwork: favoriteMarkets.favoriteMarkets
        }
      }
    })
  );
  const isLoading = useAppSelector(state =>
    Object.values(state.markets.isLoading).some(Boolean)
  );
  const error = useAppSelector(state =>
    Object.values(state.markets.error).some(
      value => value !== null && value.message !== 'canceled'
    )
  );

  return {
    data: markets,
    fetch: useCallback(async () => {
      dispatch(getMarkets('open'));
      dispatch(getMarkets('closed'));
      dispatch(getMarkets('resolved'));
      dispatch(getFavoriteMarkets(favoriteMarkets.favoriteMarkets));
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch]),
    // prettier-ignore
    // eslint-disable-next-line no-nested-ternary
    state: isLoading ? 'loading' : error ? 'error' : !markets.length ? 'warning' : 'success' as const
  };
}

export type UseMarkets = ReturnType<typeof useMarkets>;
