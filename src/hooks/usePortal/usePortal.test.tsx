import { render, screen } from '@testing-library/react';
import { act, renderHook } from '@testing-library/react-hooks';

import usePortal from './usePortal';

const portal = {
  root: document.body,
  onEffect: jest.fn()
};

function renderPortal() {
  return renderHook(() => usePortal(portal));
}
function ComponentWithPortal({ component: Portal }) {
  return <Portal>portal</Portal>;
}

describe('usePortal', () => {
  it('should mount anything correctly', () => {
    const { result } = renderPortal();
    render(<ComponentWithPortal component={result.current} />);

    expect(screen.queryByText('portal')).not.toBeInTheDocument();
  });
  it('should mount and unmount portal correctly', () => {
    const { result } = renderPortal();
    const { rerender } = render(
      <ComponentWithPortal component={result.current} />
    );

    act(() => {
      result.current.mount(true);
    });
    rerender(<ComponentWithPortal component={result.current} />);

    expect(portal.onEffect).toHaveBeenCalledTimes(1);
    expect(screen.getByText('portal')).toBeInTheDocument();

    act(() => {
      result.current.unmount();
    });
    rerender(<ComponentWithPortal component={result.current} />);

    expect(screen.queryByText('portal')).not.toBeInTheDocument();
  });
});
