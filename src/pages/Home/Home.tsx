import { marketsSelector } from 'redux/ducks/markets';

import { VoteProvider } from 'contexts/vote';

import { useAppSelector, useFavoriteMarkets, useFilters } from 'hooks';

import HomeNav from './HomeNav';
import HomeTabs from './HomeTabs';

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

  const openMarkets = markets.filter(market => market.state === 'open');
  const closedMarkets = markets.filter(market => market.state === 'closed');
  const resolvedMarkets = markets.filter(market => market.state === 'resolved');
  const favoritesMarkets = markets.filter(
    market =>
      favoriteMarkets[`${market.networkId}`] &&
      favoriteMarkets[`${market.networkId}`].includes(market.id)
  );

  return (
    <div className="pm-p-home">
      <HomeNav />
      <VoteProvider>
        <HomeTabs
          openMarkets={openMarkets}
          closedMarkets={closedMarkets}
          resolvedMarkets={resolvedMarkets}
          favoritesMarkets={favoritesMarkets}
        />
      </VoteProvider>
    </div>
  );
}
