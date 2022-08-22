import React, { useEffect } from 'react';

import cn from 'classnames';
import { AnimatePresence, motion } from 'framer-motion';

import { RemoveOutlinedIcon } from 'assets/icons';

import { Button } from 'components/Button';

import { usePortal } from 'hooks';

type ModalProps = React.PropsWithChildren<{
  show: boolean;
  onHide?(): void;
}>;

function Footer({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'footer'>) {
  return <footer className={cn('pm-c-modal__footer', className)} {...props} />;
}
function Header({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'header'>) {
  return <header className={cn('pm-c-modal__header', className)} {...props} />;
}
function Modal({ children, onHide, show }: ModalProps) {
  const Portal = usePortal({
    root: document.body,
    onMount() {
      document.body.style.overflow = 'hidden';
    },
    onUnmount() {
      document.body.removeAttribute('style');
    }
  });

  useEffect(() => {
    Portal.mount(show);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show]);

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
                <Button
                  variant="ghost"
                  onClick={onHide}
                  className="pm-c-modal__close-button"
                >
                  <RemoveOutlinedIcon />
                </Button>
              )}
              {children}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </Portal>
  );
}

export default Object.assign(Modal, {
  Header,
  Footer
});
