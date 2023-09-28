import { ReactNode, createContext, useMemo } from 'react';

import useLocalStorage from 'hooks/useLocalStorage';

export type FavoriteMarketsByNetwork = { [key: string]: string[] };

type FavoriteMarkets = {
  favoriteMarkets: FavoriteMarketsByNetwork;
  setFavoriteMarkets: (_favoriteMarkets: FavoriteMarketsByNetwork) => void;
};

export const FavoriteMarketsContext = createContext<FavoriteMarkets>(
  {} as FavoriteMarkets
);

type FavoriteMarketsProviderProps = {
  children: ReactNode;
};

function FavoriteMarketsProvider({ children }: FavoriteMarketsProviderProps) {
  const [favoriteMarkets, setFavoriteMarkets] =
    useLocalStorage<FavoriteMarketsByNetwork>('favoriteMarketsByNetwork', {});

  const favoriteMarketsValue = useMemo(
    () => ({ favoriteMarkets, setFavoriteMarkets }),
    [favoriteMarkets, setFavoriteMarkets]
  );

  return (
    <FavoriteMarketsContext.Provider value={favoriteMarketsValue}>
      {children}
    </FavoriteMarketsContext.Provider>
  );
}

export default FavoriteMarketsProvider;
