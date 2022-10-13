import { render, screen } from '@testing-library/react';

import MedalIcon from './MedalIcon';
import { medalName, medalPath } from './MedalIcon.util';

describe('MedalIcon', () => {
  it('renders its path element', () => {
    const { container } = render(<MedalIcon />);

    expect(container.childNodes[0].childNodes[0]).toHaveAttribute(
      'd',
      medalPath
    );
  });
  it('is accessible if [accessible=true]', () => {
    render(<MedalIcon accessible />);

    const icon = screen.getByTitle(medalName);

    expect(icon).toBeInTheDocument();
    expect(icon).not.toHaveAttribute('aria-hidden');
  });
});
 