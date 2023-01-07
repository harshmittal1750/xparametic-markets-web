import { useCallback, useEffect, useState } from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';

import cn from 'classnames';
import { pages } from 'config';
import { Container, useMedia, useRect } from 'ui';

import { MarketList, RightSidebar } from 'components';

import useMarkets from 'hooks/useMarkets';

import HomeClasses from './Home.module.scss';
import HomeFilter from './HomeFilter';
import HomeHero from './HomeHero';
import HomeNav from './HomeNav';

export default function Home() {
  const markets = useMarkets();
  const routeMatch = useRouteMatch();
  const isDesktop = useMedia('(min-width: 1024px)');
  const [ref, rect] = useRect();
  const [show, setShow] = useState(false);
  const handleShow = useCallback(() => setShow(true), []);
  const handleHide = useCallback(() => setShow(false), []);
  const handleToggle = useCallback(() => setShow(prevShow => !prevShow), []);

  useEffect(() => {
    markets.fetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="d-flex">
      <div className="f-fill">
        <Switch>
          <Route exact path={routeMatch.path}>
            {isDesktop && <HomeHero />}
            <Container
              ref={ref}
              $enableGutters
              className={cn(
                'bb-thin d-flex g-12 pm-p-home__navigation',
                HomeClasses.nav
              )}
            >
              <HomeNav onFilterClick={isDesktop ? handleToggle : handleShow} />
            </Container>
            <div className="d-flex">
              <HomeFilter onFilterHide={handleHide} rect={rect} show={show} />
              <MarketList markets={markets} />
            </div>
          </Route>
          {Object.values(pages.home.pages).map(page => (
            <Route
              key={page.name}
              path={routeMatch.path + page.pathname}
              component={page.Component}
            />
          ))}
        </Switch>
      </div>
      <RightSidebar />
    </div>
  );
}
