import { useContext } from 'react';

import { ThemeContext } from './useTheme.utils';

export default function useTheme() {
  return useContext(ThemeContext);
}
