import { Fragment, useCallback, useState } from 'react';

import { AnimatePresence, motion } from 'framer-motion';
import {
  Adornment,
  Divider,
  List,
  ListItem,
  ListItemText,
  Toggle,
  useMedia
} from 'ui';

import { Icon, Modal, ToggleSwitch } from 'components';
import type { ModalProps } from 'components/Modal';

import type { Dropdown } from 'contexts/filters/filters.type';

import { useFilters } from 'hooks';

type ListItemNestedProps = {
  onToggleChange: (
    path?: string
  ) => (event: React.ChangeEvent<HTMLInputElement>) => void;
  subitems: Dropdown;
};

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
      className="p-sticky"
      animate={show ? 'show' : 'hide'}
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
      {...props}
    />
  );
}
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
export default function HomeFilter({
  onFilterHide,
  rect,
  show
}: {
  onFilterHide(): void;
  rect: DOMRect;
  show: boolean;
}) {
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
  const ModalFilterRoot = isDesktop ? ModalFilterAnimation : HomeFilterModal;

  return (
    <ModalFilterRoot
      show={show}
      {...(isDesktop
        ? {
            style: {
              height: window.innerHeight - rect.height,
              top: rect.height
            }
          }
        : { onHide: onFilterHide })}
    >
      <List className="pm-p-home__filter-list h-100% bg-primary desktop:bg-unset">
        {!isDesktop && (
          <ListItem>
            <ListItemText>Filter</ListItemText>
            <Adornment edge="end">
              <Icon name="Cross" onClick={onFilterHide} />
            </Adornment>
          </ListItem>
        )}
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
    </ModalFilterRoot>
  );
}
