import { getByTestId } from '@testing-library/react';
import { act, renderHook } from '@testing-library/react-hooks';
import { getFocusTrapId } from 'helpers';

import useFocustrappers, { Trap } from './useFocustrappers';

function renderFocustrappers() {
  const el = document.createElement('div');

  return {
    el,
    ...renderHook(() => useFocustrappers())
  };
}

describe('useFocustrappers', () => {
  it('should return start and end focus trappers elements correctly', () => {
    const { result } = renderFocustrappers();

    Object.values(Trap).forEach(trap => {
      expect(result.current[trap]).toHaveAttribute(
        'data-testid',
        getFocusTrapId(trap)
      );
      expect(result.current[trap]).toHaveAttribute('tabindex', '0');
    });
  });
  it('should insert the focus trappers elements just once correctly', () => {
    const { el, result, rerender } = renderFocustrappers();

    jest.spyOn(result.current, 'insertOn');
    act(() => {
      result.current.insertOn(el);
    });

    rerender();

    Object.values(Trap).forEach(trap =>
      expect(getByTestId(el, getFocusTrapId(trap))).toBeTruthy()
    );
    expect(result.current.insertOn).toHaveBeenCalledTimes(1);
  });
  it('should check if the focus trappers elements were inserted correctly', () => {
    const { el, result } = renderFocustrappers();
    let isOn: boolean | undefined = false;

    act(() => {
      result.current.insertOn(el);
      isOn = result.current.isOn(el);
    });

    expect(isOn).toBeTruthy();
  });
});
