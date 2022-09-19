import { renderHook } from '@testing-library/react-hooks';

import useMounted from './useMounted';

describe('useMounted', () => {
  it('returns true when the component did mount', () => {
    const { result } = renderHook(() => useMounted());

    expect(result.current.current).toBeTruthy();
  });
  it('returns false when the component will unmount', () => {
    const { result, unmount } = renderHook(() => useMounted());

    unmount();
    expect(result.current.current).toBeFalsy();
  });
});
