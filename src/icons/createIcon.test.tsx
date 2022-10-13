import { render, screen } from '@testing-library/react';

import createIcon from './createIcon';

const defaults = {
  path: 'PATH',
  name: 'NAME'
};

describe('createIcon', () => {
  it('renders the path element with the provided name', () => {
    const Icon = createIcon(defaults.name, <path d={defaults.path} />);
    const { container } = render(<Icon accessible />);

    expect(screen.getByTitle(defaults.name)).toBeInTheDocument();
    expect(container.childNodes[0] instanceof SVGElement).toBe(true);
    expect(container.childNodes[0].childNodes[1]).toHaveAttribute(
      'd',
      defaults.path
    );
  });
});
