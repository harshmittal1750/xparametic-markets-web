import { createContext, useContext, useEffect, useMemo, useState } from 'react';

import useMedia from 'ui/useMedia';

import { useLocalStorage, useTimeoutEffect } from 'hooks';

export type ThemeProps = {
  device: {
    type: 'mobile' | 'tablet' | 'desktop' | 'tv';
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
    type: 'mobile',
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

export const useTheme = () => useContext(ThemeContext);
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
  const value: ThemeProps = useMemo(() => {
    const system = (() => {
      if (isDark) return 'dark';
      return 'light';
    })();

    return {
      device: {
        mode: stored === 'system' ? system : stored,
        type: (() => {
          if (isTv) return 'tv';
          if (isDesktop) return 'desktop';
          if (isTablet) return 'tablet';
          return 'mobile';
        })(),
        setMode: setStored
      }
    };
  }, [isDark, isDesktop, isTablet, isTv, setStored, stored]);

  handleChangeTheme(value.device.mode);
  useEffect(() => {
    style.appendChild(document.createTextNode(`*{${STYLE_RULES}}`));
    document.head.appendChild(style);
    timeoutEffect(() => document.head.removeChild(style), 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [style, value.device.mode]);

  return <ThemeContext.Provider value={value} {...props} />;
}
