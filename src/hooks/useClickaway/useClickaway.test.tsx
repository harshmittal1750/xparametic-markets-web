import { useRef } from 'react';

import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import useClickaway from './useClickaway';

const onClickaway = jest.fn();

function ComponentWithClickaway({ lock }: { lock?: boolean }) {
  const ref = useRef(null);

  useClickaway(ref, onClickaway, lock ? [false] : undefined);

  return (
    <>
      <div ref={ref}>inside</div>
      <button type="button">outside</button>
    </>
  );
}

describe('useClickaway', () => {
  it('should mutate the referenced node correctly', () => {
    render(<ComponentWithClickaway />);

    expect(screen.getByText('inside')).toHaveAttribute('tabindex', '0');
  });
  it('should call its handler correctly', async () => {
    render(<ComponentWithClickaway />);

    fireEvent.focusOut(screen.getByText('inside'));
    await waitFor(() => expect(onClickaway).toHaveBeenCalledTimes(1));
  });
  it('should not call its handler it is locked correctly', async () => {
    render(<ComponentWithClickaway lock />);

    fireEvent.focusOut(screen.getByText('inside'));
    await waitFor(() => expect(onClickaway).not.toHaveBeenCalled());
  });
});
