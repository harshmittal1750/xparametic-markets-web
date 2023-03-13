import { createContext, useContext, useEffect, useMemo, useState } from 'react';

import useMedia from 'ui/useMedia';

import { useLocalStorage, useTimeoutEffect } from 'hooks';

export type ThemeProps = {
  device: {
    mode: 'light' | 'dark';
    type: Record<'isTv' | 'isDesktop' | 'isTablet', boolean>;
    setMode: React.Dispatch<
      React.SetStateAction<ThemeProps['device']['mode'] | 'system'>
    >;
  };
};
export type ThemeProviderProps = Omit<
  React.ProviderProps<Record<string, never>>,
  'value'
>;

const STYLE_RULES = [
  '-webkit-transition:none!important',
  '-moz-transition:none!important',
  '-o-transition:none!important',
  '-ms-transition:none!important',
  'transition:none!important'
].join(';');
const ThemeContext = createContext<ThemeProps>({
  device: {
    mode: 'light',
    type: {
      isTv: false,
      isDesktop: false,
      isTablet: false
    },
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

export function isThemeDark(
  mode: ThemeProps['device']['mode']
): mode is 'dark' {
  return mode === 'dark';
}
export function useTheme() {
  return useContext(ThemeContext);
}
export default function ThemeProvider(props: ThemeProviderProps) {
  const [stored, setStored] = useLocalStorage<
    ThemeProps['device']['mode'] | 'system'
  >('THEME_MODE', 'system');
  const [style] = useState(() => document.createElement('style'));
  const timeoutEffect = useTimeoutEffect();
  const isDark = useMedia('(prefers-color-scheme: dark)');
  const isTablet = useMedia('(min-width: 512px)');
  const isDesktop = useMedia('(min-width: 1024px)');
  const isTv = useMedia('(min-width: 1440px)');
  const value: ThemeProps = useMemo(
    () => ({
      device: {
        mode: (() => {
          if (stored === 'system') {
            if (isDark) return 'dark';
            return 'light';
          }
          return stored;
        })(),
        type: {
          isTv,
          isDesktop,
          isTablet
        },
        setMode: setStored
      }
    }),
    [isDark, isDesktop, isTablet, isTv, setStored, stored]
  );

  handleChangeTheme(value.device.mode);
  useEffect(() => {
    style.appendChild(document.createTextNode(`*{${STYLE_RULES}}`));
    document.head.appendChild(style);
    timeoutEffect(() => document.head.removeChild(style), 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [style, value.device.mode]);

  return <ThemeContext.Provider value={value} {...props} />;
}
