import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { getFocusTrapId } from 'helpers';

import ModalFooter from 'components/ModalFooter';
import ModalHeader from 'components/ModalHeader';
import ModalHeaderTitle from 'components/ModalHeaderTitle';
import ModalSection from 'components/ModalSection';
import ModalSectionText from 'components/ModalSectionText';

import { FocusTrap } from 'hooks';

import Modal from './Modal';

const defaultProps = {
  show: true,
  onHide: jest.fn(),
  'aria-labelledby': 'test-modal-name',
  'aria-describedby': 'test-moda-description'
};

function renderModal() {
  const result = render(
    <Modal {...defaultProps}>
      <ModalHeader>
        <ModalHeaderTitle id={defaultProps['aria-labelledby']}>
          {defaultProps['aria-labelledby']}
        </ModalHeaderTitle>
      </ModalHeader>
      <ModalSection>
        <ModalSectionText id={defaultProps['aria-describedby']}>
          {defaultProps['aria-describedby']}
        </ModalSectionText>
      </ModalSection>
      <ModalFooter>
        <button type="button">action</button>
      </ModalFooter>
    </Modal>
  );
  const elements = {
    root: screen.getByRole('dialog', {
      name: defaultProps['aria-labelledby']
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

    expect(screen.getByTestId(getFocusTrapId(FocusTrap.Start))).toHaveFocus();

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
    const { elements } = renderModal();

    expect(
      screen.getByRole('heading', {
        level: 2,
        name: defaultProps['aria-labelledby']
      })
    ).toBeInTheDocument();
    expect(elements.root).toHaveAccessibleName(defaultProps['aria-labelledby']);

    expect(
      screen.getByText(defaultProps['aria-describedby'])
    ).toBeInTheDocument();
    expect(elements.root).toHaveAccessibleDescription(
      defaultProps['aria-describedby']
    );
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
