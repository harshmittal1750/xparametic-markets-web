import { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';

import cn from 'classnames';
import { motion } from 'framer-motion';
import {
  Hero,
  Container,
  useMedia,
  ListItem,
  ListItemText,
  Adornment
} from 'ui';

import heroBanner from 'assets/images/pages/home/illuminate_fantasy_league_banner.png';
import heroLogo from 'assets/images/pages/home/illuminate_fantasy_league_logo.svg';

import { Icon, MarketListAsync, Text } from 'components';
import Modal from 'components/Modal';
import type { ModalProps } from 'components/Modal';

import HomeClasses from './Home.module.scss';
import HomeFilter from './HomeFilter';
import HomeNav from './HomeNav';

function HomeFilterModal(
  props: Pick<ModalProps, 'show' | 'onHide' | 'children'>
) {
  return (
    <Modal
      fullScreen
      disableGutters
      initial={{ x: -304 }}
      animate={{ x: 0 }}
      exit={{ x: -304 }}
      {...props}
    />
  );
}
function ModalFilterAnimation({
  show,
  ...props
}: Pick<ModalProps, 'show' | 'children'>) {
  return (
    <motion.div
      variants={{
        show: {
          width: 'auto',
          x: 0
        },
        hide: {
          width: 0,
          x: -264
        }
      }}
      animate={show ? 'show' : 'hide'}
      {...props}
    />
  );
}
export default function Home() {
  const isDesktop = useMedia('(min-width: 1024px)');
  const [show, setShow] = useState(false);
  const handleShow = useCallback(() => setShow(true), []);
  const handleHide = useCallback(() => setShow(false), []);
  const handleToggle = useCallback(() => setShow(prevShow => !prevShow), []);
  const ModalFilterRoot = isDesktop ? ModalFilterAnimation : HomeFilterModal;

  return (
    <>
      <Container className={HomeClasses.header}>
        {isDesktop && (
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
        )}
        <HomeNav
          isDesktop={isDesktop}
          onFilterClick={isDesktop ? handleToggle : handleShow}
        />
      </Container>
      <div
        style={{
          display: 'flex',
          height: window.innerHeight
        }}
      >
        <ModalFilterRoot show={show} onHide={handleHide}>
          <HomeFilter>
            {!isDesktop && (
              <ListItem>
                <ListItemText>Filter</ListItemText>
                <Adornment edge="end">
                  <Icon name="Cross" onClick={handleHide} />
                </Adornment>
              </ListItem>
            )}
          </HomeFilter>
        </ModalFilterRoot>
        <MarketListAsync />
      </div>
    </>
  );
}
