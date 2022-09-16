import { render, screen } from '@testing-library/react';
import cn from 'classnames';

import ModalFooter from './ModalFooter';

describe('ModalFooter', () => {
  it('renders its children', () => {
    render(
      <ModalFooter>
        <div>test</div>
      </ModalFooter>
    );

    expect(screen.getByText('test')).toBeInTheDocument();
  });
  it('accepts extra [className]', () => {
    render(
      <ModalFooter
        className={cn('class', {
          name: true
        })}
      >
        footer
      </ModalFooter>
    );

    expect(screen.getByText('footer')).toHaveClass(
      'pm-c-modal__footer class name'
    );
  });
  it('accepts extra props', () => {
    render(<ModalFooter data-testid="footer" />);

    expect(screen.getByTestId('footer')).toBeInTheDocument();
  });
});
