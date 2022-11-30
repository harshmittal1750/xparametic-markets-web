import { Fragment, useCallback, useState } from 'react';

import { AnimatePresence, motion } from 'framer-motion';
import { Adornment, Divider, List, ListItem, ListItemText, Toggle } from 'ui';

import { Button, Icon, Modal, ToggleSwitch } from 'components';

import type { Dropdown } from 'contexts/filters/filters.type';

import { useAppSelector, useFilters } from 'hooks';

type ListItemNestedProps = {
  onToggleChange: (
    path?: string
  ) => (event: React.ChangeEvent<HTMLInputElement>) => void;
  subitems: Dropdown;
};

function ListItemNested({ onToggleChange, subitems }: ListItemNestedProps) {
  const [expand, setExpand] = useState(false);

  function handleExpand() {
    setExpand(prevExpand => !prevExpand);
  }

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

export default function HomeNavFilter({ isDesktop }: { isDesktop: boolean }) {
  const {
    state,
    controls: { toggleFavorites, toggleDropdownOption }
  } = useFilters();

  const isMarketsLoading = useAppSelector(_state =>
    Object.values(_state.markets.isLoading).some(Boolean)
  );

  const [show, setShow] = useState(false);

  const handleShow = useCallback(() => {
    setShow(true);
  }, []);

  const handleHide = useCallback(() => {
    setShow(false);
  }, []);

  const handleToggleChange = useCallback(
    (path?: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      toggleDropdownOption({ path, selected: event.target.checked });
    },
    [toggleDropdownOption]
  );

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        className="pm-p-home__navigation__actions"
        onClick={handleShow}
        disabled={isMarketsLoading}
        style={{ display: 'inherit', height: 'auto' }}
        {...(!isDesktop && { 'aria-label': 'Filter' })}
      >
        <Icon name="Filter" />
        {isDesktop && 'Filter'}
      </Button>
      <Modal
        show={show}
        onHide={handleHide}
        backdrop
        fullScreen
        disableGutters
        initial={{ x: -304 }}
        animate={{ x: 0 }}
        exit={{ x: -304 }}
      >
        <List className="pm-p-home__filter-list">
          <ListItem>
            <ListItemText>Filter</ListItemText>
            <Adornment edge="end">
              <Icon name="Cross" onClick={handleHide} />
            </Adornment>
          </ListItem>
          <ListItem>
            <ListItemText>Favorites</ListItemText>
            <Adornment edge="end">
              <ToggleSwitch
                name="favorites"
                checked={state.favorites.checked}
                onChange={toggleFavorites}
              />
            </Adornment>
          </ListItem>
          {Object.keys(state.dropdowns).map(dropdrown => (
            <Fragment key={dropdrown}>
              <Divider />
              <ListItemNested
                subitems={state.dropdowns[dropdrown]}
                onToggleChange={handleToggleChange}
              />
            </Fragment>
          ))}
        </List>
      </Modal>
    </>
  );
}
