/* eslint-disable no-unused-vars */
import { ReactNode, createContext } from 'react';

import { useLocalStorage } from 'hooks';

type FavoriteMarkets = {
  favoriteMarkets: string[];
  setFavoriteMarkets: (favoriteMarkets: string[]) => void;
};

export const FavoriteMarketsContext = createContext<FavoriteMarkets>(
  {} as FavoriteMarkets
);

type FavoriteMarketsProviderProps = {
  children: ReactNode;
};

function FavoriteMarketsProvider({ children }: FavoriteMarketsProviderProps) {
  const [favoriteMarkets, setFavoriteMarkets] = useLocalStorage<string[]>(
    'favoriteMarkets',
    []
  );

  return (
    <FavoriteMarketsContext.Provider
      value={{ favoriteMarkets, setFavoriteMarkets }}
    >
      {children}
    </FavoriteMarketsContext.Provider>
  );
}

export default FavoriteMarketsProvider;
