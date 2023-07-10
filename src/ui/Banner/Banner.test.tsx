import { render, screen } from '@testing-library/react';

import Banner from './Banner';

test('renders role', () => {
  render(<Banner />);

  expect(screen.getByRole('banner')).toBeInTheDocument();
});
test('renders hide button', () => {
  render(<Banner />);

  expect(
    screen.getByRole('button', {
      name: 'Close'
    })
  ).toBeInTheDocument();
});
