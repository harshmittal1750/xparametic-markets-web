import { render, screen } from '@testing-library/react';
import cn from 'classnames';

import ModalSection from './ModalSection';

describe('ModalSection', () => {
  it('renders its children', () => {
    render(
      <ModalSection>
        <div>test</div>
      </ModalSection>
    );

    expect(screen.getByText('test')).toBeInTheDocument();
  });
  it('accepts extra [className]', () => {
    render(
      <ModalSection
        className={cn('class', {
          name: true
        })}
      >
        footer
      </ModalSection>
    );

    expect(screen.getByText('footer')).toHaveClass(
      'pm-c-modal__section class name'
    );
  });
  it('accepts extra props', () => {
    render(<ModalSection data-testid="footer" />);

    expect(screen.getByTestId('footer')).toBeInTheDocument();
  });
});
