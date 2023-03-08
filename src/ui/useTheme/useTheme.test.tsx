import { renderHook } from '@testing-library/react-hooks';

import ThemeProvider, { useTheme } from './useTheme';

function renderTheme() {
  return renderHook(() => useTheme(), {
    wrapper: ({ children }) => <ThemeProvider>{children}</ThemeProvider>
  });
}
it('returns base mode and device types', () => {
  const { result } = renderTheme();

  expect(result.current.device.mode).toBe('light');
  expect(result.current.device.type).toBe('mobile');
});
