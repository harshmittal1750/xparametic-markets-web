import { render, screen } from '@testing-library/react';

import ModalHeader from './ModalHeader';

describe('ModalHeader', () => {
  it('renders its children', () => {
    render(
      <ModalHeader>
        <h1>heading</h1>
      </ModalHeader>
    );

    expect(
      screen.getByRole('heading', {
        level: 1,
        name: 'heading'
      })
    ).toBeInTheDocument();
  });
  // todo: renders Hide button
});
