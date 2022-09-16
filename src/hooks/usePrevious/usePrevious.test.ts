import { renderHook } from '@testing-library/react-hooks';

import usePrevious from './usePrevious';

enum Value {
  Prev,
  Cur
}

describe('usePrevious', () => {
  it('returns the previous provided value', () => {
    const { result, rerender } = renderHook(
      initialProps => usePrevious(initialProps.value),
      { initialProps: { value: Value.Prev } }
    );

    rerender({
      value: Value.Cur
    });
    expect(result.current.current).toBe(Value.Cur);
  });
});
