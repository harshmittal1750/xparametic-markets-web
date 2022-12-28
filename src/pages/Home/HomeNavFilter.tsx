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

export default function HomeNavFilter({ isDesktop }: { isDesktop: boolean }) {
  const filters = useFilters();
  const isLoading = useAppSelector(state =>
    Object.values(state.markets.isLoading).some(Boolean)
  );
  const [show, setShow] = useState(false);
  const handleShow = useCallback(() => setShow(true), []);
  const handleHide = useCallback(() => setShow(false), []);
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
      <Button
        variant="outline"
        size="sm"
        className="pm-p-home__navigation__actions"
        onClick={handleShow}
        disabled={isLoading}
        {...(!isDesktop && { 'aria-label': 'Filter' })}
      >
        <Icon name="Filter" />
        {isDesktop && 'Filter'}
      </Button>
      <Modal
        fullScreen
        disableGutters
        show={show}
        onHide={handleHide}
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
      </Modal>
    </>
  );
}
