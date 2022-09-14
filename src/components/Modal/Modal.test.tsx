import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { getFocusTrapId } from 'helpers';

import ModalFooter from 'components/ModalFooter';
import ModalHeader from 'components/ModalHeader';
import ModalHeaderTitle from 'components/ModalHeaderTitle';
import ModalSection from 'components/ModalSection';
import ModalSectionText from 'components/ModalSectionText';

import Modal from './Modal';

const defaultProps = {
  show: true,
  onHide: jest.fn(),
  name: 'test'
};

enum A11y {
  Title,
  Description
}

function renderModal() {
  const result = render(
    <Modal {...defaultProps}>
      <ModalHeader>
        <ModalHeaderTitle>{A11y.Title}</ModalHeaderTitle>
      </ModalHeader>
      <ModalSection>
        <ModalSectionText>{A11y.Description}</ModalSectionText>
      </ModalSection>
      <ModalFooter>
        <button type="button">action</button>
      </ModalFooter>
    </Modal>
  );
  const elements = {
    root: screen.getByRole('dialog', {
      name: `${A11y.Title}`
    }),
    overlay: screen.getByRole('presentation'),
    hide: screen.getByRole('button', {
      name: 'Hide'
    })
  };

  return {
    elements,
    ...result
  };
}

describe('Modal', () => {
  // todo: renders its content throught usePortal
  it('locks body overflow', () => {
    renderModal();

    expect(document.body).toHaveStyle({
      overflow: 'hidden'
    });
  });
  it('renders accessible title and description content', () => {
    const { elements } = renderModal();

    expect(
      screen.getByRole('heading', {
        level: 2,
        name: `${A11y.Title}`
      })
    ).toBeInTheDocument();
    expect(elements.root).toHaveAccessibleName(`${A11y.Title}`);

    expect(screen.getByText(`${A11y.Description}`)).toBeInTheDocument();
    expect(elements.root).toHaveAccessibleDescription(`${A11y.Description}`);
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
  it('calls [onHide] throught useClickaway', async () => {
    const { elements } = renderModal();

    fireEvent.focusOut(elements.root);
    await waitFor(() => expect(defaultProps.onHide).toHaveBeenCalled());
  });
  it('calls [onHide] throught Escape keydown', () => {
    const { elements } = renderModal();

    fireEvent.keyDown(elements.overlay, { key: 'Escape' });
    expect(defaultProps.onHide).toHaveBeenCalled();
  });
  // todo: positions focus trapper elements in order
  it('traps focus on focusable elements inside it throught useFocustrap', async () => {
    const { elements } = renderModal();

    expect(screen.getByTestId(getFocusTrapId('start'))).toHaveFocus();

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
});
