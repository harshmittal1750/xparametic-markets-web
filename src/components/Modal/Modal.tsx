import React, { useEffect, useRef } from 'react';

import { AnimatePresence, motion } from 'framer-motion';

import { RemoveOutlinedIcon } from 'assets/icons';

import { Button } from 'components/Button';

import { useClickaway, usePortal, usePrevious, useFocustrap } from 'hooks';

import { ModalProps } from './Modal.type';

export default function Modal({
  children,
  onHide,
  show,
  ...props
}: ModalProps) {
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
              className="pm-c-modal"
              {...props}
            >
              {onHide && (
                <Button
                  variant="ghost"
                  onClick={onHide}
                  className="pm-c-modal__header-hide"
                  aria-label="Hide"
                >
                  <RemoveOutlinedIcon />
                </Button>
              )}
              {children}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Portal>
  );
}
