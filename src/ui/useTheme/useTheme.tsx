import { createContext, useContext, useEffect, useMemo, useRef } from 'react';

import useMedia from 'ui/useMedia';

import { useLocalStorage } from 'hooks';

export type ThemeProps = {
  device: {
    mode: 'light' | 'dark';
    setMode: React.Dispatch<
      React.SetStateAction<ThemeProps['device']['mode'] | undefined>
    >;
  } & Record<'isTv' | 'isDesktop' | 'isTablet', boolean>;
};
type ThemeProviderProps = Omit<
  React.ProviderProps<Record<string, never>>,
  'value'
>;

export const STYLE_RULES =
  "*{-webkit-transition:none!important;-moz-transition:none!important;-o-transition:none!important;-ms-transition:none!important;transition:none!important'}";
const THEME_MODE = 'THEME_MODE';
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
  const [mode, setMode] = useLocalStorage<
    ThemeProps['device']['mode'] | undefined
  >(THEME_MODE, undefined);
  const isFirstMount = useRef(true);
  const isDark = useMedia('(prefers-color-scheme: dark)');
  const isTablet = useMedia('(min-width: 512px)');
  const isDesktop = useMedia('(min-width: 1024px)');
  const isTv = useMedia('(min-width: 1440px)');
  const value: ThemeProps = useMemo(
    () => ({
      device: {
        mode: (() => {
          if (!mode) {
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
  useEffect(() => {
    isFirstMount.current = false;
  });
  useEffect(() => {
    if (isFirstMount.current) return undefined;

    let timer = 0;
    const style = document.createElement('style');

    style.appendChild(document.createTextNode(STYLE_RULES));
    document.head.appendChild(style);
    (() => window.getComputedStyle(document.body))();
    timer = window.setTimeout(() => document.head.removeChild(style), 1);

    return () => {
      window.clearTimeout(timer);
    };
  }, [value.device.mode]);

  return <ThemeContext.Provider value={value} {...props} />;
}
