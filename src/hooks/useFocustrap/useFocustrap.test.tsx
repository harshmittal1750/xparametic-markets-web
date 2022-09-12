import { useRef } from 'react';

import { waitFor } from '@testing-library/dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { getFocusTrapId } from 'helpers';

import useFocustrap, { Trap } from './useFocustrap';

function ComponentWithFocustrap() {
  const ref = useRef(null);

  useFocustrap(ref);

  return (
    <div ref={ref}>
      <button type="button">button</button>
    </div>
  );
}

describe('useFocustrap', () => {
  it('should insert the focus trappers elements correctly', () => {
    render(<ComponentWithFocustrap />);

    Object.values(Trap).forEach(trap =>
      expect(screen.getByTestId(getFocusTrapId(trap))).toBeTruthy()
    );
  });
  it('should focus the start trapper element and trap it inside the container correctly', async () => {
    render(<ComponentWithFocustrap />);

    const button = screen.getByText('button');

    expect(screen.getByTestId(getFocusTrapId(Trap.START))).toHaveFocus();
    userEvent.tab();
    expect(button).toHaveFocus();
    userEvent.tab();
    await waitFor(() => expect(button).toHaveFocus());
  });
  it('should focus the previous element on unmount back correctly', async () => {
    const { unmount } = render(<ComponentWithFocustrap />);

    expect(screen.getByTestId(getFocusTrapId(Trap.START))).toHaveFocus();
    unmount();
    Object.values(Trap).forEach(trap =>
      expect(screen.queryByTestId(getFocusTrapId(trap))).not.toBeInTheDocument()
    );
    expect(document.body).toHaveFocus();
  });
});
