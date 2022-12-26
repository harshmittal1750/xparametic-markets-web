import { marketsSelector } from 'redux/ducks/markets';
import { Hero } from 'ui';

import heroBanner from 'assets/images/pages/home/illuminate_fantasy_league_banner.png';
import heroLogo from 'assets/images/pages/home/illuminate_fantasy_league_logo.svg';

import { Button, MarketListAsync, Text } from 'components';

import { useAppSelector, useFavoriteMarkets, useFilters } from 'hooks';

import HomeNav from './HomeNav';

export default function Home() {
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

  return (
    <div className="pm-p-home">
      <Hero className="pm-p-home__hero" image={heroBanner}>
        <div className="pm-p-home__hero__content">
          <div className="pm-p-home__hero__breadcrumb">
            <Text
              as="span"
              scale="tiny-uppercase"
              fontWeight="semibold"
              color="white-50"
            >
              Illuminate Fantasy League / World Cup 2022
            </Text>
          </div>
          <Text
            as="h2"
            fontWeight="bold"
            scale="heading-large"
            color="light"
            className="pm-p-home__hero__heading"
          >
            Place your World Cup predictions to win the IFL Title!
          </Text>
          <Button
            size="sm"
            color="primary"
            onClick={() => window.open('/docs', '_blank')}
          >
            About IFL
          </Button>
        </div>
        <img
          alt="Illuminate Fantasy League"
          width={293}
          height={205}
          src={heroLogo}
        />
      </Hero>
      <HomeNav />
      <MarketListAsync
        markets={markets}
        favoriteMarkets={favoriteMarkets.favoriteMarkets}
      />
    </div>
  );
}
