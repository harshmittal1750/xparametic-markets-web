import { useCallback } from 'react';

import { camelize } from 'humps';
import {
  getFavoriteMarkets,
  getMarkets,
  marketsSelector
} from 'redux/ducks/markets';

import useAppDispatch from './useAppDispatch';
import useAppSelector from './useAppSelector';
import useFavoriteMarkets from './useFavoriteMarkets';
import useFilters from './useFilters';

export default function useMarkets() {
  const dispatch = useAppDispatch();
  const favoriteMarkets = useFavoriteMarkets();
  const { state: filtersState } = useFilters();
  const rawMarkets = useAppSelector(state => state.markets);
  const isLoading = useAppSelector(state => state.markets.isLoading);
  const error = useAppSelector(state => state.markets.error);

  const markets = marketsSelector({
    state: rawMarkets,
    filters: {
      favorites: {
        checked: filtersState.toggles.favorites,
        marketsByNetwork: favoriteMarkets.favoriteMarkets
      },
      states: filtersState.dropdowns.states as string[],
      networks: filtersState.dropdowns.networks as string[],
      tokens: filtersState.dropdowns.tokens as string[],
      volume: filtersState.dropdowns.volume as string,
      liquidity: filtersState.dropdowns.liquidity as string,
      endDate: filtersState.dropdowns.endDate as string,
      categories: filtersState.dropdowns.categories as string[],
      tournaments: filtersState.dropdowns.tournaments as string[],
      ...Object.keys(filtersState.dropdowns).reduce((acc, filter) => {
        acc[`${camelize(filter)}`] = filtersState.dropdowns[filter];
        return acc;
      }, {})
    }
  });

  return {
    data: markets,
    fetch: useCallback(async () => {
      dispatch(getMarkets('open'));
      dispatch(getMarkets('closed'));
      dispatch(getMarkets('resolved'));
      dispatch(getFavoriteMarkets(favoriteMarkets.favoriteMarkets));
    }, [dispatch, favoriteMarkets.favoriteMarkets]),
    state: (() => {
      if (Object.values(isLoading).some(Boolean)) return 'loading';
      if (
        Object.values(error).some(
          value => value !== null && value.message !== 'canceled'
        )
      )
        return 'error';
      if (!markets.length) return 'warning';
      return 'success';
    })()
  } as const;
}

export type UseMarkets = ReturnType<typeof useMarkets>;
