/* eslint-disable import/no-cycle */
import { useContext } from 'react';

import uniq from 'lodash/uniq';
import without from 'lodash/without';

import { FavoriteMarketsContext } from 'contexts/favoriteMarkets';

import useNetwork from './useNetwork';

function useFavoriteMarkets() {
  const { network } = useNetwork();
  const { favoriteMarkets, setFavoriteMarkets } = useContext(
    FavoriteMarketsContext
  );

  function addFavoriteMarket(marketId: string) {
    setFavoriteMarkets({
      ...favoriteMarkets,
      [network.id]: uniq([...(favoriteMarkets[network.id] || []), marketId])
    });
  }

  function removeFavoriteMarket(marketId: string) {
    setFavoriteMarkets({
      ...favoriteMarkets,
      [network.id]: [...without(favoriteMarkets[network.id] || [], marketId)]
    });
  }

  return {
    favoriteMarkets: favoriteMarkets[network.id] || [],
    addFavoriteMarket,
    removeFavoriteMarket
  };
}

export default useFavoriteMarkets;
