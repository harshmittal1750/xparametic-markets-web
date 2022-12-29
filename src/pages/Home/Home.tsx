import { useCallback, Fragment, useState } from 'react';
import { Link } from 'react-router-dom';

import cn from 'classnames';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Hero,
  Container,
  useMedia,
  Adornment,
  Divider,
  List,
  ListItem,
  ListItemText,
  Toggle
} from 'ui';

import heroBanner from 'assets/images/pages/home/illuminate_fantasy_league_banner.png';
import heroLogo from 'assets/images/pages/home/illuminate_fantasy_league_logo.svg';

import { MarketListAsync, Text } from 'components';
import Icon from 'components/Icon';
import ToggleSwitch from 'components/ToggleSwitch';

import type { Dropdown } from 'contexts/filters/filters.type';

import { useFilters } from 'hooks';

import HomeClasses from './Home.module.scss';
import HomeNav from './HomeNav';

type ListItemNestedProps = {
  onToggleChange: (
    path?: string
  ) => (event: React.ChangeEvent<HTMLInputElement>) => void;
  subitems: Dropdown;
};

function ListItemNested({ onToggleChange, subitems }: ListItemNestedProps) {
  const [expand, setExpand] = useState(false);
  const handleExpand = useCallback(() => {
    setExpand(prevExpand => !prevExpand);
  }, []);

  return (
    <>
      <ListItem onClick={handleExpand}>
        <ListItemText>{subitems.title}</ListItemText>
        <Adornment edge="end">
          <Icon name="Chevron" size="lg" dir={expand ? 'up' : 'down'} />
        </Adornment>
      </ListItem>
      <AnimatePresence>
        {expand && (
          <motion.div
            style={{ overflow: 'hidden' }}
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            exit={{ height: 0 }}
          >
            <List className="pm-p-home__filter-list-sublist">
              {subitems.options.map(option => (
                <ListItem key={option.path}>
                  <ListItemText>{option.label}</ListItemText>
                  <Adornment edge="end">
                    <Toggle
                      type="checkbox"
                      checked={option.selected}
                      value={option.value}
                      name={option.label}
                      onChange={onToggleChange(option.path)}
                    />
                  </Adornment>
                </ListItem>
              ))}
            </List>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
export default function Home() {
  const isDesktop = useMedia('(min-width: 1024px)');
  const filters = useFilters();
  const handleToggleChange = useCallback(
    (path?: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      filters.controls.toggleDropdownOption({
        path,
        selected: event.target.checked
      });
    },
    [filters.controls]
  );

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
        <HomeNav />
      </Container>
      <div
        style={{
          display: 'flex',
          height: window.innerHeight
        }}
      >
        <List className="pm-p-home__filter-list">
          <ListItem>
            <ListItemText>Favorites</ListItemText>
            <Adornment edge="end">
              <ToggleSwitch
                name="favorites"
                checked={filters.state.favorites.checked}
                onChange={filters.controls.toggleFavorites}
              />
            </Adornment>
          </ListItem>
          {Object.keys(filters.state.dropdowns).map(dropdrown => (
            <Fragment key={dropdrown}>
              <Divider />
              <ListItemNested
                subitems={filters.state.dropdowns[dropdrown]}
                onToggleChange={handleToggleChange}
              />
            </Fragment>
          ))}
        </List>
        <MarketListAsync />
      </div>
    </>
  );
}
