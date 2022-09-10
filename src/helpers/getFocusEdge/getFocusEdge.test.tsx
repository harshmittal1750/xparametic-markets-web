import { render, screen } from '@testing-library/react';

import getFocusEdge from './getFocusEdge';

describe('getFocusEdge', () => {
  it('should return start and end focusable elements correctly', () => {
    const { container } = render(
      <div>
        <button type="button">start button</button>
        <button type="button">another one</button>
        <a href="./">end link</a>
        <p>random paragraph</p>
      </div>
    );
    const focusEdge = getFocusEdge(container);

    expect(screen.getByText(/start/i)).toEqual(focusEdge.start);
    expect(screen.getByText(/end/i)).toEqual(focusEdge.end);
  });
});
