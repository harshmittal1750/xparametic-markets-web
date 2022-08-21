import React, { useEffect } from 'react';

import { AnimatePresence, motion } from 'framer-motion';

import { RemoveOutlinedIcon } from 'assets/icons';

import { Button } from 'components';

import { usePortal } from 'hooks';

type ModalProps = React.PropsWithChildren<{
  show: boolean;
  onClose?(): void;
}>;

export default function Modal({ children, onClose, show }: ModalProps) {
  const Portal = usePortal({
    root: document.querySelector('[data-theme="dark"]'),
    initialMount: show,
    onMount() {
      document.body.style.overflow = 'hidden';
    },
    onUnmount() {
      document.body.removeAttribute('style');
    }
  });

  useEffect(() => {
    if (!show) Portal.mount(false);
  }, [Portal, show]);

  function handleClose() {
    onClose?.();
    Portal.mount(false);
  }

  return (
    <Portal>
      <div className="pm-c-modal__overlay">
        <AnimatePresence>
          <motion.div
            layout
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
          >
            <div
              role="dialog"
              tabIndex={-1}
              aria-modal="true"
              className="pm-c-modal"
            >
              {onClose && (
                <Button variant="ghost" onClick={handleClose}>
                  <RemoveOutlinedIcon />
                </Button>
              )}
              <div className="pm-c-modal__content">{children}</div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </Portal>
  );
}
