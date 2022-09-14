import { render, screen } from '@testing-library/react';

import ModalHeaderTitle from './ModalHeaderTitle';

describe('ModalHeaderTitle', () => {
  it('renders its children', () => {
    render(<ModalHeaderTitle>text</ModalHeaderTitle>);

    expect(
      screen.getByRole('heading', {
        level: 2,
        name: 'text'
      })
    ).toBeInTheDocument();
  });
  // todo: classname
  // todo: id
});
