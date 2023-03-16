import { renderHook } from '@testing-library/react-hooks';

import useUpdateEffect from './useUpdateEffect';

function renderUpdateEffect() {
  return renderHook(
    initialProps =>
      useUpdateEffect(() => {
        console.log('hey');
      }, [initialProps.deps]),
    {
      initialProps: {
        deps: 0
      }
    }
  );
}

jest.spyOn(window.console, 'log');
it('runs effects only on update phase', () => {
  const { rerender } = renderUpdateEffect();

  expect(window.console.log).not.toHaveBeenCalled();
  rerender({ deps: 1 });
  expect(window.console.log).toHaveBeenCalledWith('hey');
});
