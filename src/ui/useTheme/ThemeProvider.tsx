import useMedia from 'ui/useMedia';

import { useLocalStorage } from 'hooks';

import { Theme, ThemeProviderProps } from './Theme.type';
import { ThemeContext } from './Theme.utils';

import './Theme.scss';

export default function ThemeProvider(props: ThemeProviderProps) {
  const [stored, setStored] = useLocalStorage<Theme['mode']>(
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
