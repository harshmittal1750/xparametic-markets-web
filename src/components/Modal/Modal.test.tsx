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
  const els = {
    root: screen.getByRole('dialog', {
      name: `${A11y.Title}`
    }),
    overlay: screen.getByRole('presentation'),
    hide: screen.getByRole('button', {
      name: 'Hide'
    })
  };

  return {
    els,
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
  it('renders sr title', () => {
    const { els } = renderModal();

    expect(els.root).toBeInTheDocument();
    expect(
      screen.getByRole('heading', {
        level: 2,
        name: `${A11y.Title}`
      })
    );
  });
  it('animates its overlay and root element', () => {
    const { els } = renderModal();

    expect(els.overlay).toHaveStyle({
      opacity: 0
    });
    expect(els.root).toHaveStyle({
      transform: 'translateY(16px) translateZ(0)'
    });
  });
  it('calls [onHide] throught useClickaway', async () => {
    const { els } = renderModal();

    fireEvent.focusOut(els.root);
    await waitFor(() => expect(defaultProps.onHide).toHaveBeenCalled());
  });
  it('calls [onHide] throught Escape keydown', () => {
    const { els } = renderModal();

    fireEvent.keyDown(els.overlay, { key: 'Escape' });
    expect(defaultProps.onHide).toHaveBeenCalled();
  });
  // todo: positions focus trapper elements in order
  it('traps focus on focusable elements inside it throught useFocustrap', async () => {
    const { els } = renderModal();

    expect(screen.getByTestId(getFocusTrapId('start'))).toHaveFocus();

    userEvent.tab();
    expect(els.hide).toHaveFocus();

    userEvent.tab();
    expect(
      screen.getByRole('button', {
        name: 'action'
      })
    ).toHaveFocus();

    userEvent.tab();
    await waitFor(() => expect(els.hide).toHaveFocus());
  });
});
