import { createContext, useContext } from 'react';

import { Theme } from './Theme.type';

export const ThemeContext = createContext<Theme>({
  mode: 'system',
  setMode: () => {}
});

export function useTheme() {
  return useContext(ThemeContext);
}

ThemeContext.displayName = 'Theme';
