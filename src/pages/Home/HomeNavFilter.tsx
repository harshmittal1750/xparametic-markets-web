import { ChangeEvent, useCallback, useState } from 'react';

import { AnimatePresence, motion } from 'framer-motion';
import { Adornment, Divider, List, ListItem, ListItemText, Toggle } from 'ui';

import { Button, Icon, Modal, ToggleSwitch } from 'components';

import { useFilters } from 'hooks';

export default function HomeNavFilter() {
  const {
    state: { favorites, dropdowns },
    controls: { toggleFavorites, toggleDropdownOption }
  } = useFilters();

  const { network, country, stage, state } = dropdowns;

  const [show, setShow] = useState(false);
  const [expand, setExpand] = useState({
    network: false,
    country: false,
    stage: false,
    state: false
  });

  const handleShow = useCallback(() => {
    setShow(true);
  }, []);

  const handleHide = useCallback(() => {
    setShow(false);
  }, []);

  const handleExpand = useCallback((name: string) => {
    return () =>
      setExpand(prevExpand => ({
        ...prevExpand,
        [name]: !prevExpand[name]
      }));
  }, []);

  const handleChangeDropdownOption = useCallback(
    (path?: string) => (event: ChangeEvent<HTMLInputElement>) => {
      const { checked } = event.target;

      toggleDropdownOption({ path, selected: checked });
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
      >
        <Icon name="Filter" />
        Filter
      </Button>
      <Modal
        show={show}
        backdrop
        fullScreen
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
                checked={favorites.checked}
                onChange={toggleFavorites}
              />
            </Adornment>
          </ListItem>
          <Divider />
          <ListItem onClick={handleExpand('network')}>
            <ListItemText>{network.title}</ListItemText>
            <Adornment edge="end">
              <Icon
                name="Chevron"
                size="lg"
                dir={expand.network ? 'up' : 'down'}
              />
            </Adornment>
          </ListItem>
          <AnimatePresence>
            {expand.network && (
              <motion.div
                style={{ overflow: 'hidden' }}
                initial={{ height: 0 }}
                animate={{ height: 'auto' }}
                exit={{ height: 0 }}
              >
                <List className="pm-p-home__filter-list-sublist">
                  {network.options.map(option => (
                    <ListItem key={option.path}>
                      <ListItemText>{option.label}</ListItemText>
                      <Adornment edge="end">
                        <Toggle
                          type="checkbox"
                          checked={option.selected}
                          value={option.value}
                          name={option.label}
                          onChange={handleChangeDropdownOption(option.path)}
                        />
                      </Adornment>
                    </ListItem>
                  ))}
                </List>
              </motion.div>
            )}
          </AnimatePresence>
          <Divider />
          <ListItem onClick={handleExpand('country')}>
            <ListItemText>{country.title}</ListItemText>
            <Adornment edge="end">
              <Icon
                name="Chevron"
                size="lg"
                dir={expand.country ? 'up' : 'down'}
              />
            </Adornment>
          </ListItem>
          <AnimatePresence>
            {expand.country && (
              <motion.div
                style={{ overflow: 'hidden' }}
                initial={{ height: 0 }}
                animate={{ height: 'auto' }}
                exit={{ height: 0 }}
              >
                <List className="pm-p-home__filter-list-sublist">
                  {country.options.map(option => (
                    <ListItem key={option.path}>
                      <ListItemText>{option.label}</ListItemText>
                      <Adornment edge="end">
                        <Toggle
                          type="checkbox"
                          checked={option.selected}
                          value={option.value}
                          name={option.label}
                          onChange={handleChangeDropdownOption(option.path)}
                        />
                      </Adornment>
                    </ListItem>
                  ))}
                </List>
              </motion.div>
            )}
          </AnimatePresence>
          <Divider />
          <ListItem onClick={handleExpand('stage')}>
            <ListItemText>{stage.title}</ListItemText>
            <Adornment edge="end">
              <Icon
                name="Chevron"
                size="lg"
                dir={expand.stage ? 'up' : 'down'}
              />
            </Adornment>
          </ListItem>
          <AnimatePresence>
            {expand.stage && (
              <motion.div
                style={{ overflow: 'hidden' }}
                initial={{ height: 0 }}
                animate={{ height: 'auto' }}
                exit={{ height: 0 }}
              >
                <List className="pm-p-home__filter-list-sublist">
                  {stage.options.map(option => (
                    <ListItem key={option.path}>
                      <ListItemText>{option.label}</ListItemText>
                      <Adornment edge="end">
                        <Toggle
                          type="checkbox"
                          checked={option.selected}
                          value={option.value}
                          name={option.label}
                          onChange={handleChangeDropdownOption(option.path)}
                        />
                      </Adornment>
                    </ListItem>
                  ))}
                </List>
              </motion.div>
            )}
          </AnimatePresence>
          <Divider />
          <ListItem onClick={handleExpand('state')}>
            <ListItemText>{state.title}</ListItemText>
            <Adornment edge="end">
              <Icon
                name="Chevron"
                size="lg"
                dir={expand.state ? 'up' : 'down'}
              />
            </Adornment>
          </ListItem>
          <AnimatePresence>
            {expand.state && (
              <motion.div
                style={{ overflow: 'hidden' }}
                initial={{ height: 0 }}
                animate={{ height: 'auto' }}
                exit={{ height: 0 }}
              >
                <List className="pm-p-home__filter-list-sublist">
                  {state.options.map(option => (
                    <ListItem key={option.path}>
                      <ListItemText>{option.label}</ListItemText>
                      <Adornment edge="end">
                        <Toggle
                          type="checkbox"
                          checked={option.selected}
                          value={option.value}
                          name={option.label}
                          onChange={handleChangeDropdownOption(option.path)}
                        />
                      </Adornment>
                    </ListItem>
                  ))}
                </List>
              </motion.div>
            )}
          </AnimatePresence>
        </List>
      </Modal>
    </>
  );
}
