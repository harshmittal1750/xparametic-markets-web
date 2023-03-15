import { act, renderHook } from '@testing-library/react-hooks';
import { mockMatchMedia } from 'helpers/test';

import ThemeProvider, { IDLE_STYLES, isThemeDark, useTheme } from './useTheme';

function renderTheme() {
  return renderHook(() => useTheme(), {
    wrapper: ({ children }) => <ThemeProvider>{children}</ThemeProvider>
  });
}

describe('ThemeProvider', () => {
  it('returns user prefered color scheme instead of system one', () => {
    mockMatchMedia({ matches: true });

    const { result } = renderTheme();

    jest.useFakeTimers();

    // Both base device mode and types
    expect(result.current.device.isTablet).toBe(true);
    expect(result.current.device.isDesktop).toBe(true);
    expect(result.current.device.isTv).toBe(true);
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
    expect(document.documentElement).toHaveClass('theme--dark');
    expect(result.current.device.mode).toBe('dark');
    // Users prefered different color scheme change
    act(() => result.current.device.setMode('light'));
    // Idle styles injected to enhance faster theme change experience
    expect(document.head.children[0].textContent).toMatch(IDLE_STYLES);
    jest.runAllTimers();
    expect(document.head.children[0]).toBeFalsy();
    // Prefered theme applied
    expect(document.documentElement.getAttribute('data-theme')).toBe('light');
    expect(document.documentElement).toHaveClass('theme--light');
    expect(result.current.device.mode).toBe('light');
  });
});
describe('isThemeDark', () => {
  it('returns true if scheme color is dark', () => {
    expect(isThemeDark('dark')).toBe(true);
  });
  it('returns false if scheme color is light', () => {
    expect(isThemeDark('light')).toBe(false);
  });
});
