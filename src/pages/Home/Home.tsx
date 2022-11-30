import { marketsSelector } from 'redux/ducks/markets';

import { MarketListAsync } from 'components';

import { VoteProvider } from 'contexts/vote';

import { useAppSelector, useFavoriteMarkets, useFilters } from 'hooks';

import HomeNav from './HomeNav';

export default function Home() {
  const {
    state: { favorites },
    selected
  } = useFilters();
  const { dropdowns } = selected;

  const { favoriteMarkets } = useFavoriteMarkets();

  const markets = useAppSelector(state =>
    marketsSelector({
      state: state.markets,
      filters: {
        ...dropdowns,
        favorites: {
          checked: favorites.checked,
          marketsByNetwork: favoriteMarkets
        }
      }
    })
  );

  return (
    <div className="pm-p-home">
      <HomeNav />
      <VoteProvider>
        <MarketListAsync markets={markets} favoriteMarkets={favoriteMarkets} />
      </VoteProvider>
    </div>
  );
}
