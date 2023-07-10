import { render, screen } from '@testing-library/react';

import Filter from './Filter';

it('renders label', () => {
  render(
    <Filter
      description=""
      defaultOption="filter"
      options={[]}
      onChange={jest.fn}
    />
  );

  expect(screen.getByLabelText('filter')).toBeInTheDocument();
});
