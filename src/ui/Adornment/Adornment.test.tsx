import { render, screen } from '@testing-library/react';

import Adornment from './Adornment';
import type { AdornmentProps } from './Adornment';
import adornmentClasses from './Adornment.module.scss';

function renderAdornment(props: AdornmentProps) {
  render(<Adornment data-testid="adornment" {...props} />);

  return screen.getByTestId(/adornment/i);
}
it('render [$edge=start] classes', () => {
  const adornment = renderAdornment({ $edge: 'start' });

  expect(adornment).toHaveClass(adornmentClasses.edgeStart);
});
it('render [$edge=end] classes', () => {
  const adornment = renderAdornment({ $edge: 'end' });

  expect(adornment).toHaveClass(adornmentClasses.edgeEnd);
});
