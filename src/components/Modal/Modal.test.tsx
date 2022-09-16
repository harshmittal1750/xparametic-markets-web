import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ModalFooter from 'components/ModalFooter';
import ModalHeader from 'components/ModalHeader';
import ModalHeaderTitle from 'components/ModalHeaderTitle';
import ModalSection from 'components/ModalSection';
import ModalSectionText from 'components/ModalSectionText';

import Modal from './Modal';
import { modalTrappersId } from './Modal.util';

const defaultProps = {
  show: true,
  onHide: jest.fn(),
  'aria-labelledby': 'test-modal-name',
  'aria-describedby': 'test-modal-description'
};

function renderModal() {
  const a11y = {
    name: defaultProps['aria-labelledby'],
    desc: defaultProps['aria-describedby']
  };
  const result = render(
    <Modal {...defaultProps}>
      <ModalHeader>
        <ModalHeaderTitle id={a11y.name}>{a11y.name}</ModalHeaderTitle>
      </ModalHeader>
      <ModalSection>
        <ModalSectionText id={a11y.desc}>{a11y.desc}</ModalSectionText>
      </ModalSection>
      <ModalFooter>
        <button type="button">action</button>
      </ModalFooter>
    </Modal>
  );
  const elements = {
    root: screen.getByRole('dialog', {
      name: a11y.name
    }),
    overlay: screen.getByRole('presentation'),
    hide: screen.getByRole('button', {
      name: 'Hide'
    }),
    title: screen.getByRole('heading', {
      level: 2,
      name: a11y.name
    })
  };

  return {
    a11y,
    elements,
    ...result
  };
}

describe('Modal', () => {
  it('renders nothing without [show=true]', () => {
    render(<Modal show={false} />);

    expect(screen.queryByRole('presentation')).not.toBeInTheDocument();
  });
  it('calls [onHide] through useClickaway', async () => {
    const { elements } = renderModal();

    fireEvent.focusOut(elements.root);
    await waitFor(() => expect(defaultProps.onHide).toHaveBeenCalled());
  });
  it('calls [onHide] through Escape keydown', () => {
    const { elements } = renderModal();

    fireEvent.keyDown(elements.overlay, { key: 'Escape' });
    expect(defaultProps.onHide).toHaveBeenCalled();
  });
  it('traps focus on focusable elements inside it through useFocustrap', async () => {
    const { elements } = renderModal();

    expect(screen.getByTestId(modalTrappersId.start)).toHaveFocus();

    userEvent.tab();
    expect(elements.hide).toHaveFocus();

    userEvent.tab();
    expect(
      screen.getByRole('button', {
        name: 'action'
      })
    ).toHaveFocus();

    userEvent.tab();
    await waitFor(() => expect(elements.hide).toHaveFocus());
  });
  it('locks body overflow', () => {
    renderModal();

    expect(document.body).toHaveStyle({
      overflow: 'hidden'
    });
  });
  it('renders accessible title and description content', () => {
    const { elements, a11y } = renderModal();

    expect(elements.title).toBeInTheDocument();
    expect(elements.root).toHaveAccessibleName(a11y.name);

    expect(screen.getByText(a11y.desc)).toBeInTheDocument();
    expect(elements.root).toHaveAccessibleDescription(a11y.desc);
  });
  it('animates its overlay and root element', () => {
    const { elements } = renderModal();

    expect(elements.overlay).toHaveStyle({
      opacity: 0
    });
    expect(elements.root).toHaveStyle({
      transform: 'translateY(16px) translateZ(0)'
    });
  });
});
