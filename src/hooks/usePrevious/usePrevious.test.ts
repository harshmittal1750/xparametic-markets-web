import { renderHook } from '@testing-library/react-hooks';

import usePrevious from './usePrevious';

enum Defaults {
  Prev = 'PREVIOUS',
  Cur = 'CURRENT'
}

describe('usePrevious', () => {
  it('returns the previous provided value', () => {
    const { result, rerender } = renderHook(
      initialProps => usePrevious(initialProps.value),
      { initialProps: { value: Defaults.Prev } }
    );

    rerender({
      value: Defaults.Cur
    });
    expect(result.current.current).toBe(Defaults.Cur);
  });
});
