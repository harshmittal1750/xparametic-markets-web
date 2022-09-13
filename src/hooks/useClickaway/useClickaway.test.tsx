import { useRef } from 'react';

import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import useClickaway from './useClickaway';

const onClickaway = jest.fn();

function ComponentWithClickaway({ deps }: { deps?: boolean[] }) {
  const ref = useRef(null);

  useClickaway(ref, onClickaway, deps);

  return <div ref={ref} data-testid="node" />;
}

describe('useClickaway', () => {
  it('mutates the referenced node', () => {
    render(<ComponentWithClickaway />);
    const node = screen.getByTestId('node');

    expect(node).toHaveAttribute('tabindex', '0');
  });
  it('calls the passed callback', async () => {
    render(<ComponentWithClickaway />);
    const node = screen.getByTestId('node');

    fireEvent.focusOut(node);
    await waitFor(() => expect(onClickaway).toHaveBeenCalledTimes(1));
  });
  it("doesn't call the passed callback", async () => {
    render(<ComponentWithClickaway deps={[false]} />);
    const node = screen.getByTestId('node');

    fireEvent.focusOut(node);
    expect(onClickaway).not.toHaveBeenCalled();
  });
});
