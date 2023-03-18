import { createContext, useContext, useMemo } from 'react';

import useMedia from 'ui/useMedia';
import useUpdateEffect from 'ui/useUpdateEffect';

import { useLocalStorage } from 'hooks';

export const IDLE_STYLES =
  "*{-webkit-transition:none!important;-moz-transition:none!important;-o-transition:none!important;-ms-transition:none!important;transition:none!important'}";
export const THEME_MODE_KEY = 'THEME_MODE_KEY';
export const THEME_MODE_SYSTEM = 'system';

export type ThemeModes =
  | ThemeProps['device']['mode']
  | typeof THEME_MODE_SYSTEM;
export type ThemeProps = {
  device: {
    mode: 'light' | 'dark';
    setMode: React.Dispatch<React.SetStateAction<ThemeModes>>;
  } & Record<'isTv' | 'isDesktop' | 'isTablet', boolean>;
};
type ThemeProviderProps = Omit<
  React.ProviderProps<Record<string, never>>,
  'value'
>;

const ThemeContext = createContext<ThemeProps>({
  device: {
    mode: 'light',
    isTv: false,
    isDesktop: false,
    isTablet: false,
    setMode: () => {}
  }
});
ThemeContext.displayName = 'Theme';

function handleChangeTheme(arg: ThemeProps['device']['mode']) {
  document.documentElement.dataset.theme = arg;
  document.documentElement.classList.add(`theme--${arg}`);
  document.documentElement.classList.remove(
    `theme--${arg === 'dark' ? 'light' : 'dark'}`
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
export function isThemeDark(
  mode: ThemeProps['device']['mode']
): mode is 'dark' {
  return mode === 'dark';
}
export default function ThemeProvider(props: ThemeProviderProps) {
  const [mode, setMode] = useLocalStorage<ThemeModes>(
    THEME_MODE_KEY,
    THEME_MODE_SYSTEM
  );
  const isDark = useMedia('(prefers-color-scheme: dark)');
  const isTablet = useMedia('(min-width: 512px)');
  const isDesktop = useMedia('(min-width: 1024px)');
  const isTv = useMedia('(min-width: 1440px)');
  const value: ThemeProps = useMemo(
    () => ({
      device: {
        mode: (() => {
          if (mode === THEME_MODE_SYSTEM) {
            if (isDark) return 'dark';
            return 'light';
          }
          return mode;
        })(),
        isTv,
        isDesktop,
        isTablet,
        setMode
      }
    }),
    [isDark, isDesktop, isTablet, isTv, setMode, mode]
  );

  handleChangeTheme(value.device.mode);
  useUpdateEffect(() => {
    let timer = 0;
    const style = document.createElement('style');

    style.appendChild(document.createTextNode(IDLE_STYLES));
    document.head.appendChild(style);
    (() => window.getComputedStyle(document.body))();
    timer = window.setTimeout(() => document.head.removeChild(style), 1);

    return () => {
      window.clearTimeout(timer);
    };
  }, [value.device.mode]);

  return <ThemeContext.Provider value={value} {...props} />;
}
