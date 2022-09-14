import React, { useEffect, useMemo, useRef } from 'react';

import { AnimatePresence, motion } from 'framer-motion';

import {
  useClickaway,
  usePortal,
  usePrevious,
  useFocustrap,
  ModalContext
} from 'hooks';

import { ModalProps } from './Modal.type';

export default function Modal({ children, onHide, show, name }: ModalProps) {
  const modalContextValue = useMemo(
    () => ({
      name,
      onHide,
      labelledby: 'modal-title',
      describedby: 'modal-description'
    }),
    [name, onHide]
  );
  const { current: showPrev } = usePrevious(show);
  const ref = useRef<HTMLDivElement>(null);
  const Portal = usePortal({
    root: document.body,
    onEffect() {
      document.body.style.overflow = 'hidden';

      return () => {
        document.body.removeAttribute('style');
      };
    }
  });

  useEffect(() => {
    if (showPrev && !show) {
      setTimeout(Portal.unmount, 300);
    } else {
      Portal.mount(show);
    }
  }, [Portal, show, showPrev]);
  useClickaway(ref, () => onHide?.(), [showPrev, show]);
  useFocustrap(ref);

  function handleKeyDown(event: React.KeyboardEvent) {
    if (event.key === 'Escape') onHide?.();
  }

  return (
    <Portal>
      <ModalContext.Provider value={modalContextValue}>
        <AnimatePresence>
          {show && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              role="presentation"
              className="pm-c-modal__overlay"
              onKeyDown={handleKeyDown}
            >
              <motion.div
                ref={ref}
                initial={{ y: 16 }}
                animate={{ y: 0 }}
                exit={{ y: 16 }}
                role="dialog"
                aria-modal="true"
                aria-labelledby={`${name}-${modalContextValue.labelledby}`}
                aria-describedby={`${name}-${modalContextValue.describedby}`}
                className="pm-c-modal"
              >
                {children}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </ModalContext.Provider>
    </Portal>
  );
}
