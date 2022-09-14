import { render, screen } from '@testing-library/react';

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
  // todo: className
});
