import { Fragment, useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';

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

import homeClasses from './Home.module.scss';

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
    <AnimatePresence>
      {show && (
        <motion.div
          className={homeClasses.filter}
          initial={{ width: 0, x: -264 }}
          animate={{ width: 'auto', x: 0 }}
          exit={{ width: 0, x: -264 }}
          {...props}
        />
      )}
    </AnimatePresence>
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
        <Adornment $edge="end">
          <Icon name="Chevron" size="lg" dir={expand ? 'up' : 'down'} />
        </Adornment>
      </ListItem>
      <AnimatePresence>
        {expand && (
          <motion.div
            className={homeClasses.filterSub}
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            exit={{ height: 0 }}
          >
            <List className={homeClasses.filterSubList}>
              {subitems.options.map(option => (
                <ListItem key={option.path}>
                  <ListItemText>{option.label}</ListItemText>
                  <Adornment $edge="end">
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

  const {
    watch,
    register,
    handleSubmit,
    formState: { errors },
    getValues
  } = useForm({ defaultValues: { favorites: true } });

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
      <form>
        <List className={homeClasses.filterList}>
          {!isDesktop && (
            <ListItem>
              <ListItemText>Filter</ListItemText>
              <Adornment $edge="end">
                <Icon name="Cross" onClick={onFilterHide} />
              </Adornment>
            </ListItem>
          )}
          <ListItem>
            <ListItemText>Favorites</ListItemText>
            <Adornment $edge="end">
              <ToggleSwitch id="favorites" {...register('favorites')} />
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
      </form>
    </ModalFilterRoot>
  );
}
