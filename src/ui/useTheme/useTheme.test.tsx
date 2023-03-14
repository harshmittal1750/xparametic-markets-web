import { act, renderHook } from '@testing-library/react-hooks';
import { mockMatchMedia } from 'helpers/test';

import ThemeProvider from './ThemeProvider';
import useTheme from './useTheme';

function renderTheme() {
  return renderHook(() => useTheme(), {
    wrapper: ({ children }) => <ThemeProvider>{children}</ThemeProvider>
  });
}

it('returns base mode and device types', () => {
  mockMatchMedia({ matches: false });

  const { result } = renderTheme();

  expect(document.documentElement.getAttribute('data-theme')).toBe('light');
  expect(document.documentElement).toHaveClass('theme--light');
  expect(result.current.device.mode).toBe('light');
  expect(result.current.device.isTablet).toBe(false);
  expect(result.current.device.isDesktop).toBe(false);
  expect(result.current.device.isTv).toBe(false);
});
it('returns true for device types and dark color scheme if media matches', () => {
  mockMatchMedia({ matches: true });

  const { result } = renderTheme();

  expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
  expect(document.documentElement).toHaveClass('theme--dark');
  expect(result.current.device.mode).toBe('dark');
  expect(result.current.device.isTablet).toBe(true);
  expect(result.current.device.isDesktop).toBe(true);
  expect(result.current.device.isTv).toBe(true);
});
it('returns user prefered color scheme instead of system one', () => {
  mockMatchMedia({ matches: false });

  const { result } = renderTheme();

  expect(document.documentElement.getAttribute('data-theme')).toBe('light');
  expect(document.documentElement).toHaveClass('theme--light');
  expect(result.current.device.mode).toBe('light');
  act(() => result.current.device.setMode('dark'));
  expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
  expect(document.documentElement).toHaveClass('theme--dark');
  expect(result.current.device.mode).toBe('dark');
});
