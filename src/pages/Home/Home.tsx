import { Link } from 'react-router-dom';

import cn from 'classnames';
import { Hero, Container } from 'ui';

import heroBanner from 'assets/images/pages/home/illuminate_fantasy_league_banner.png';
import heroLogo from 'assets/images/pages/home/illuminate_fantasy_league_logo.svg';

import { MarketListAsync, Text } from 'components';

import HomeClasses from './Home.module.scss';
import HomeNav from './HomeNav';

export default function Home() {
  return (
    <>
      <Container className={HomeClasses.header}>
        <Hero
          className={cn('pm-p-home__hero', HomeClasses.hero)}
          image={heroBanner}
        >
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
            <Link
              className="pm-c-button-normal--primary pm-c-button--sm"
              to="/docs"
            >
              About IFL
            </Link>
          </div>
          <img
            alt="Illuminate Fantasy League"
            width={293}
            height={205}
            src={heroLogo}
          />
        </Hero>
        <HomeNav />
      </Container>
      <div>
        <MarketListAsync />
      </div>
    </>
  );
}
