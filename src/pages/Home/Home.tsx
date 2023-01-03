import { useCallback, useState } from 'react';

import { motion } from 'framer-motion';
import { Container, useMedia, ListItem, ListItemText, Adornment } from 'ui';

import { Icon, MarketListAsync } from 'components';
import Modal from 'components/Modal';
import type { ModalProps } from 'components/Modal';

import HomeClasses from './Home.module.scss';
import HomeFilter from './HomeFilter';
import HomeHero from './HomeHero';
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
        {isDesktop && <HomeHero />}
        <HomeNav
          isDesktop={isDesktop}
          onFilterClick={isDesktop ? handleToggle : handleShow}
        />
      </Container>
      <div
        className="d-flex"
        style={{
          height: window.innerHeight
        }}
      >
        <ModalFilterRoot
          show={show}
          {...(!isDesktop && {
            onHide: handleHide
          })}
        >
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
