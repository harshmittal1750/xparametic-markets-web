import { useCallback, useEffect, useState } from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';

import { pages } from 'config';
import { Container, useMedia, useRect } from 'ui';

import { MarketList, RightSidebar } from 'components';

import useMarkets from 'hooks/useMarkets';

import homeClasses from './Home.module.scss';
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
    <div className={homeClasses.root}>
      <div className={homeClasses.content}>
        <Switch>
          <Route exact path={routeMatch.path}>
            {isDesktop && <HomeHero />}
            <Container ref={ref} $enableGutters className={homeClasses.nav}>
              <HomeNav onFilterClick={isDesktop ? handleToggle : handleShow} />
            </Container>
            <div className={homeClasses.root}>
              <HomeFilter onFilterHide={handleHide} rect={rect} show={show} />
              <MarketList markets={markets} />
            </div>
          </Route>
          {Object.values(pages.home.pages).map(page => (
            <Route
              key={page.name}
              exact={page.exact}
              path={page.pathname}
              component={page.Component}
            />
          ))}
        </Switch>
      </div>
      {isDesktop && <RightSidebar />}
    </div>
  );
}
