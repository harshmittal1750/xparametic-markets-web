import React from 'react';

import { AnimatePresence, motion } from 'framer-motion';

import { RemoveOutlinedIcon } from 'assets/icons';

import { Button } from 'components';

import { usePortal } from 'hooks';

type ModalProps = React.PropsWithChildren<{
  show: boolean;
  onHide?(): void;
}>;

export default function Modal({ children, onHide, show }: ModalProps) {
  const Portal = usePortal({
    root: document.querySelector('[data-theme="dark"]'),
    mount: show,
    onMount() {
      document.body.style.overflow = 'hidden';
    },
    onUnmount() {
      document.body.removeAttribute('style');
    }
  });

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
              {onHide && (
                <Button variant="ghost" onClick={onHide}>
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
