import isThemeDark from './isThemeDark';

it('returns true if scheme color is dark', () => {
  expect(isThemeDark('dark')).toBe(true);
});
it('returns false if scheme color is light', () => {
  expect(isThemeDark('light')).toBe(false);
});
