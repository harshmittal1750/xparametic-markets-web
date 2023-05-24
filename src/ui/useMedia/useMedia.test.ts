import { renderHook } from '@testing-library/react-hooks';
import { mockMatchMedia } from 'helpers/test';

import useMedia from './useMedia';

function renderMedia() {
  return renderHook(initialProps => useMedia(initialProps.query), {
    initialProps: {
      query: '(min-width: 1024px)'
    }
  });
}
it('returns true if the provided query does matches', () => {
  mockMatchMedia({ matches: true });
  expect(renderMedia().result.current).toBe(true);
});
it('returns false if the provided query does not matches', () => {
  mockMatchMedia({ matches: false });
  expect(renderMedia().result.current).toBe(false);
});
