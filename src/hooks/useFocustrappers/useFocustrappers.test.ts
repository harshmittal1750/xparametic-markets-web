import { getByTestId } from '@testing-library/react';
import { act, renderHook } from '@testing-library/react-hooks';
import { getFocusTrapId } from 'helpers';

import useFocustrappers, { Trappers } from './useFocustrappers';

function renderHookHelper() {
  const el = document.createElement('div');

  return {
    el,
    ...renderHook(() => useFocustrappers())
  };
}

describe('useFocustrappers', () => {
  it('should return start and end focus trappers elements correctly', () => {
    const { result } = renderHookHelper();

    expect(result.current.start).toHaveAttribute(
      'data-testid',
      getFocusTrapId(Trappers.START)
    );
    expect(result.current.start).toHaveAttribute('tabindex', '0');
    expect(result.current.end).toHaveAttribute(
      'data-testid',
      getFocusTrapId(Trappers.END)
    );
    expect(result.current.end).toHaveAttribute('tabindex', '0');
  });
  it('should insert the focus trappers elements just once correctly', () => {
    const { el, result, rerender } = renderHookHelper();

    jest.spyOn(result.current, 'insertOn');
    act(() => {
      result.current.insertOn(el);
    });

    rerender();

    expect(getByTestId(el, getFocusTrapId(Trappers.START))).toBeTruthy();
    expect(getByTestId(el, getFocusTrapId(Trappers.END))).toBeTruthy();
    expect(result.current.insertOn).toHaveBeenCalledTimes(1);
  });
  it('should check if the focus trappers elements were inserted correctly', () => {
    const { el, result } = renderHookHelper();
    let isOn: boolean | undefined = false;

    act(() => {
      result.current.insertOn(el);
      isOn = result.current.isOn(el);
    });

    expect(isOn).toBeTruthy();
  });
});
