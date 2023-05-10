import isTrue from './isTrue';

it('evaluate if value is true', () => {
  expect(isTrue('true')).toBe(true);
});
it('evaluate if value is not true', () => {
  expect(!isTrue('true')).toBe(false);
});
it('evaluate if value is other than true', () => {
  expect(isTrue('false')).toBe(false);
});
