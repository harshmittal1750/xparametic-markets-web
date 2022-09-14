import { render, screen } from '@testing-library/react';

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
  // todo: className
});
