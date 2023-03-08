import { createContext, useContext, useMemo } from 'react';

import useMedia from 'ui/useMedia';

import { useLocalStorage } from 'hooks';

export type ThemeProps = {
  device: {
    type: 'mobile' | 'desktop';
    mode: 'light' | 'dark';
    setMode: React.Dispatch<
      React.SetStateAction<ThemeProps['device']['mode'] | 'system'>
    >;
  };
};
export type ThemeProviderProps = Omit<
  React.ProviderProps<Record<string, never>>,
  'value'
>;

const ThemeContext = createContext<ThemeProps>({
  device: {
    mode: 'light',
    type: 'mobile',
    setMode: () => {}
  }
});
ThemeContext.displayName = 'Theme';

export const useTheme = () => useContext(ThemeContext);
export default function ThemeProvider(props: ThemeProviderProps) {
  const [stored, setStored] = useLocalStorage<
    ThemeProps['device']['mode'] | 'system'
  >('THEME_MODE', 'system');
  const system = useMedia('(prefers-color-scheme: dark)') ? 'dark' : 'light';
  const type = useMedia('(min-width: 1024px)') ? 'desktop' : 'mobile';
  const value: ThemeProps = useMemo(
    () => ({
      device: {
        mode: stored === 'system' ? system : stored,
        type,
        setMode: setStored
      }
    }),
    [setStored, stored, system, type]
  );

  document.documentElement.dataset.theme = value.device.mode;

  return <ThemeContext.Provider value={value} {...props} />;
}
