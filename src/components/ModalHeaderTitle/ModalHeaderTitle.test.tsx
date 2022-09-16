import { render, screen } from '@testing-library/react';
import cn from 'classnames';

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
  it('accepts extra [className]', () => {
    render(
      <ModalHeaderTitle
        className={cn('class', {
          name: true
        })}
      >
        header
      </ModalHeaderTitle>
    );

    expect(screen.getByText('header')).toHaveClass(
      'pm-c-modal__header-title class name'
    );
  });
  it('accepts extra props', () => {
    render(<ModalHeaderTitle id="title">title</ModalHeaderTitle>);

    expect(screen.getByText('title')).toHaveAttribute('id', 'title');
  });
});
