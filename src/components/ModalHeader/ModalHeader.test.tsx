import { render, screen } from '@testing-library/react';
import cn from 'classnames';

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
  it('accepts extra [className]', () => {
    render(
      <ModalHeader
        className={cn('class', {
          name: true
        })}
      >
        header
      </ModalHeader>
    );

    expect(screen.getByText('header')).toHaveClass(
      'pm-c-modal__header class name'
    );
  });
  it('accepts extra props', () => {
    render(<ModalHeader data-testid="header" />);

    expect(screen.getByTestId('header')).toBeInTheDocument();
  });
});
