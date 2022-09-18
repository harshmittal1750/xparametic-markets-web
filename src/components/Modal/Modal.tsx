import React, { useEffect, useRef } from 'react';

import cn from 'classnames';
import { AnimatePresence, motion } from 'framer-motion';

import { RemoveOutlinedIcon } from 'assets/icons';

import { Button } from 'components/Button';

import { useClickaway, usePortal, usePrevious, useFocustrap } from 'hooks';

import ModalStyles from './Modal.module.scss';
import { ModalProps } from './Modal.type';
import { modalTrappersId } from './Modal.util';

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
  useFocustrap(
    ref,
    ['a[href]', 'button:not([disabled])', 'textarea', 'input', 'select'],
    modalTrappersId
  );

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
            {/** todo: fix type */}
            <motion.div
              ref={ref}
              initial={{ y: 16 }}
              animate={{ y: 0 }}
              exit={{ y: 16 }}
              role="dialog"
              aria-modal="true"
              // todo: allow extend
              className={cn(ModalStyles.root)}
              {...props}
            >
              {onHide && (
                <Button
                  variant="ghost"
                  onClick={onHide}
                  // todo: allow extend
                  className={cn(ModalStyles.hide)}
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
