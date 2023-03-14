import { Fragment, useCallback, useState } from 'react';
import { useForm, UseFormRegister, UseFormWatch } from 'react-hook-form';

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

import type {
  Dropdown,
  DropdownState,
  DropdownMultipleState,
  ToggleState
} from 'contexts/filters';
import { filtersInitialState } from 'contexts/filters';

import { useFilters } from 'hooks';

import homeClasses from './Home.module.scss';

type FormFields = {
  favorites: ToggleState;
  states: DropdownState | DropdownMultipleState;
  networks: DropdownState | DropdownMultipleState;
  volume: DropdownState | DropdownMultipleState;
  liquidity: DropdownState | DropdownMultipleState;
};

type ListItemNestedProps = {
  name: string;
  subitems: Dropdown;
  multiple: boolean;
  register: UseFormRegister<FormFields>;
  watch: UseFormWatch<FormFields>;
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
function ListItemNested({
  name,
  subitems,
  multiple,
  register,
  watch
}: ListItemNestedProps) {
  const [expand, setExpand] = useState(false);
  const handleExpand = useCallback(() => {
    setExpand(prevExpand => !prevExpand);
  }, []);

  const fields = watch();

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
                <ListItem key={option.value}>
                  <ListItemText>{option.label}</ListItemText>
                  <Adornment $edge="end">
                    <Toggle
                      type={multiple ? 'checkbox' : 'radio'}
                      value={option.value}
                      checked={
                        multiple
                          ? fields[name].includes(option.value)
                          : fields[name] === option.value
                      }
                      {...register(name as keyof FormFields)}
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
  const { filters } = useFilters();
  const ModalFilterRoot = isDesktop ? ModalFilterAnimation : HomeFilterModal;

  const { register, watch } = useForm<FormFields>({
    defaultValues: {
      ...filtersInitialState.toggles,
      ...filtersInitialState.dropdowns
    }
  });

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
          {Object.keys(filters.dropdowns).map(dropdrown => (
            <Fragment key={dropdrown}>
              <Divider />
              <ListItemNested
                name={dropdrown}
                subitems={filters.dropdowns[dropdrown]}
                multiple={filters.dropdowns[dropdrown].multiple}
                register={register}
                watch={watch}
              />
            </Fragment>
          ))}
        </List>
      </form>
    </ModalFilterRoot>
  );
}
