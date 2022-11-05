import type React from 'react';
import { createContext } from 'react';

import useMedia from 'ui/useMedia';

import { useLocalStorage, usePrevious } from 'hooks';

import { SeThemeMode, ThemeModes } from './useTheme.type';

export const ThemeContext = createContext<{
  mode: ThemeModes;
  setMode: SeThemeMode;
}>({
  mode: 'system',
  setMode: () => {}
});

ThemeContext.displayName = 'Theme';

export function ThemeProvider(props: Omit<React.ProviderProps<{}>, 'value'>) {
  const [stored, setStored] = useLocalStorage<ThemeModes>(
    'THEME_MODE',
    'system'
  );
  const system = useMedia('(prefers-color-scheme: dark)') ? 'dark' : 'light';
  const mode = stored === 'system' ? system : stored;

  document.documentElement.dataset.theme = mode;

  return (
    <ThemeContext.Provider
      value={{
        mode,
        setMode: setStored
      }}
      {...props}
    />
  );
}
