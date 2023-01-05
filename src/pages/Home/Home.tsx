import { useCallback, useState } from 'react';

import cn from 'classnames';
import { Container, useMedia, useRect } from 'ui';

import { MarketList } from 'components';

import HomeClasses from './Home.module.scss';
import HomeFilter from './HomeFilter';
import HomeHero from './HomeHero';
import HomeNav from './HomeNav';

export default function Home() {
  const isDesktop = useMedia('(min-width: 1024px)');
  const [ref, rect] = useRect();
  const [show, setShow] = useState(false);
  const handleShow = useCallback(() => setShow(true), []);
  const handleHide = useCallback(() => setShow(false), []);
  const handleToggle = useCallback(() => setShow(prevShow => !prevShow), []);

  return (
    <>
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
        <MarketList />
      </div>
    </>
  );
}
