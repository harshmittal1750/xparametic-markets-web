import React, { useContext, useEffect, useRef } from 'react';

import cn from 'classnames';
import { AnimatePresence, motion, MotionConfigContext } from 'framer-motion';

import { RemoveOutlinedIcon } from 'assets/icons';

import { Button } from 'components/Button';
import Text, { TextProps } from 'components/Text';

import { usePortal, usePrevious } from 'hooks';

import {
  ModalFooterProps,
  ModalHeaderProps,
  ModalProps,
  ModalSectionProps
} from './Modal.type';
import { MODAL } from './Modal.util';

function Footer({ className, ...props }: ModalFooterProps) {
  return <footer className={cn('pm-c-modal__footer', className)} {...props} />;
}
function SectionText({ className, ...props }: TextProps) {
  return (
    <Text
      className={cn('pm-c-modal__section-text', className)}
      scale="caption"
      id={MODAL.title}
      {...props}
    />
  );
}
function Section({ className, ...props }: ModalSectionProps) {
  return (
    <section className={cn('pm-c-modal__section', className)} {...props} />
  );
}
function HeaderTitle({ className, ...props }: TextProps) {
  return (
    <Text
      as="h2"
      fontWeight="medium"
      className={cn('pm-c-modal__header-title', className)}
      scale="heading"
      id={MODAL.description}
      {...props}
    />
  );
}
function Header({ className, ...props }: ModalHeaderProps) {
  return <header className={cn('pm-c-modal__header', className)} {...props} />;
}
function Modal({ children, onHide, show }: ModalProps) {
  const motionConfig = useContext(MotionConfigContext) as {
    transition: { duration: number };
  };
  const refModal = useRef<HTMLDivElement>(null);
  const { current: wasMounted } = usePrevious(show);
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
    if (wasMounted && !show) {
      setTimeout(Portal.unmount, motionConfig.transition?.duration * 1000);
    } else {
      Portal.mount(show);
    }
  }, [Portal, wasMounted, show, motionConfig.transition?.duration]);

  useEffect(() => {
    function handleOutsideClick(event: MouseEvent) {
      if (
        wasMounted &&
        show &&
        !refModal.current?.contains(event.target as Node)
      ) {
        onHide?.();
      }
    }

    window.addEventListener('click', handleOutsideClick);

    return () => {
      window.removeEventListener('click', handleOutsideClick);
    };
  }, [onHide, show, wasMounted]);

  return (
    <Portal>
      <AnimatePresence>
        {show && (
          <motion.div
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="presentation"
            className="pm-c-modal__overlay"
          >
            <motion.div
              ref={refModal}
              initial={{ y: 30, scale: 0.9 }}
              animate={{ y: 0, scale: 1 }}
              exit={{ y: 20, scale: 0.9 }}
              role="dialog"
              aria-modal="true"
              aria-labelledby={MODAL.title}
              aria-describedby={MODAL.description}
              className="pm-c-modal"
            >
              {onHide && (
                <Button
                  variant="ghost"
                  onClick={onHide}
                  className="pm-c-modal__close-button"
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

export default Object.assign(Modal, {
  Header,
  HeaderTitle,
  Section,
  SectionText,
  Footer
});
