import { render, screen } from '@testing-library/react';

import getFocusEdge from './getFocusEdge';

enum Defaults {
  Start = 'START',
  Mid = 'MIDDLE',
  End = 'END'
}

describe('getFocusEdge', () => {
  it('returns start and end filtered focusable nodes', () => {
    const { container } = render(
      <>
        <button type="button">{Defaults.Start}</button>
        <button type="button">{Defaults.Mid}</button>
        <a href="./">{Defaults.End}</a>
      </>
    );
    const focusEdge = getFocusEdge(container, ['button']);

    expect(screen.getByText(Defaults.Start)).toEqual(focusEdge.start);
    expect(screen.getByText(Defaults.Mid)).toEqual(focusEdge.end);
  });
});
