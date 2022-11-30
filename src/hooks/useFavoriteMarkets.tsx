/* eslint-disable import/no-cycle */
import { useCallback, useContext } from 'react';

import uniq from 'lodash/uniq';
import without from 'lodash/without';

import { FavoriteMarketsContext } from 'contexts/favoriteMarkets';

function useFavoriteMarkets() {
  const { favoriteMarkets, setFavoriteMarkets } = useContext(
    FavoriteMarketsContext
  );

  const addFavoriteMarket = useCallback(
    (networkId: string, marketId: string) => {
      setFavoriteMarkets({
        ...favoriteMarkets,
        [networkId]: uniq([...(favoriteMarkets[networkId] || []), marketId])
      });
    },
    [favoriteMarkets, setFavoriteMarkets]
  );

  const removeFavoriteMarket = useCallback(
    (networkId: string, marketId: string) => {
      setFavoriteMarkets({
        ...favoriteMarkets,
        [networkId]: [...without(favoriteMarkets[networkId] || [], marketId)]
      });
    },
    [favoriteMarkets, setFavoriteMarkets]
  );

  return {
    favoriteMarkets,
    addFavoriteMarket,
    removeFavoriteMarket
  };
}

export default useFavoriteMarkets;
