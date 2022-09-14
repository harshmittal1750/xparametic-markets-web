import { render, screen } from '@testing-library/react';

import ModalHeaderSection from './ModalSectionText';

describe('ModalHeaderSection', () => {
  it('renders its children', () => {
    render(<ModalHeaderSection>text</ModalHeaderSection>);

    expect(screen.getByText('text')).toBeInTheDocument();
  });
  // todo: classname
  // todo: id
});
