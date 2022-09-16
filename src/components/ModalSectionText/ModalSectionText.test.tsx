import { render, screen } from '@testing-library/react';
import cn from 'classnames';

import ModalSectionText from './ModalSectionText';

describe('ModalSectionText', () => {
  it('renders its children', () => {
    render(<ModalSectionText>text</ModalSectionText>);

    expect(screen.getByText('text')).toBeInTheDocument();
  });
  it('accepts extra [className]', () => {
    render(
      <ModalSectionText
        className={cn('class', {
          name: true
        })}
      >
        header
      </ModalSectionText>
    );

    expect(screen.getByText('header')).toHaveClass(
      'pm-c-modal__section-text class name'
    );
  });
  it('accepts extra props', () => {
    render(<ModalSectionText id="text">text</ModalSectionText>);

    expect(screen.getByText('text')).toHaveAttribute('id', 'text');
  });
});
