import React, { useCallback, useState } from 'react';

import cn from 'classnames';
import {
  Adornment,
  List,
  ListItem,
  THEME_MODE_KEY,
  THEME_MODES,
  isThemeDark,
  useRect,
  useTheme,
  ThemeModes
} from 'ui';

import { Button } from 'components/Button';
import Icon from 'components/Icon';
import Modal from 'components/Modal';
import Text from 'components/Text';

import { useLocalStorage } from 'hooks';

import themeSelectorClasses from './ThemeSelector.module.scss';

const modes = {
  Light: 'Sun',
  Dark: 'Moon',
  System: 'Sparkles'
};

export default function NetworkSelector() {
  const theme = useTheme();
  const [modeStored] = useLocalStorage(THEME_MODE_KEY, THEME_MODES.dark);
  const [rectButton, setRectButton] = useState<DOMRect | null>(null);
  const [refDialog, rectDialog] = useRect();
  const handleShow = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) =>
      setRectButton(event.currentTarget.getBoundingClientRect()),
    []
  );
  const handleHide = useCallback(() => setRectButton(null), []);
  const handleTheme = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      theme.device.setMode(
        event.currentTarget.name.toLowerCase() as ThemeModes
      );
      handleHide();
    },
    [handleHide, theme.device]
  );

  return (
    <>
      <Button
        variant="ghost"
        color="default"
        aria-label="Switch theme"
        onClick={handleShow}
        className={themeSelectorClasses.root}
      >
        <Icon
          name={isThemeDark(theme.device.mode) ? 'Moon' : 'Sun'}
          size="lg"
        />
      </Button>
      <Modal
        ref={refDialog}
        disableGutters
        onHide={handleHide}
        disableOverlay={theme.device.isDesktop}
        fullWidth={!theme.device.isDesktop}
        show={!!rectButton}
        className={{
          dialog: themeSelectorClasses.dialog
        }}
        {...(theme.device.isDesktop
          ? {
              style: {
                left: rectButton
                  ? rectButton.left - rectDialog.width + rectButton?.width
                  : 0,
                top: `calc(${rectButton?.height}px + var(--grid-margin))`,
                width: rectButton?.width
              }
            }
          : {
              initial: { bottom: -240 },
              animate: { bottom: 0 },
              exit: { bottom: -240 }
            })}
      >
        {!theme.device.isDesktop && (
          <header className={themeSelectorClasses.header}>
            <Text
              scale="heading"
              fontWeight="bold"
              className={themeSelectorClasses.headerTitle}
            >
              Select Theme Mode
            </Text>
            <Adornment $edge="end">
              <Button
                size="xs"
                variant="ghost"
                color="default"
                aria-label="Settings"
                onClick={handleHide}
              >
                <Icon name="Cross" size="lg" />
              </Button>
            </Adornment>
          </header>
        )}
        <List className={themeSelectorClasses.list}>
          {Object.keys(modes).map(mode => (
            <ListItem key={mode} className={themeSelectorClasses.listItem}>
              <Button
                variant="ghost"
                fullwidth
                name={mode}
                onClick={handleTheme}
                className={cn(themeSelectorClasses.listItemButton, {
                  [themeSelectorClasses.listItemSelected]:
                    mode.toLowerCase() === modeStored
                })}
              >
                <span className={themeSelectorClasses.listItemButtonIcon}>
                  <Icon
                    name={modes[mode]}
                    size={theme.device.isDesktop ? 'lg' : 'xl'}
                  />
                </span>
                <Text
                  scale={theme.device.isDesktop ? 'caption' : 'body'}
                  fontWeight="semibold"
                >
                  {mode}
                </Text>
              </Button>
            </ListItem>
          ))}
        </List>
      </Modal>
    </>
  );
}
