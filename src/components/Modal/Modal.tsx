import React, { useContext, useEffect, useRef } from 'react';

import cn from 'classnames';
import { AnimatePresence, motion, MotionConfigContext } from 'framer-motion';

import { RemoveOutlinedIcon } from 'assets/icons';

import { Button } from 'components/Button';
import Text, { TextProps } from 'components/Text';

import { usePortal, usePrevious } from 'hooks';

const MODAL = {
  title: 'modal-title',
  description: 'modal-description'
};

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
function Section({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'section'>) {
  return (
    <section className={cn('pm-c-modal__section', className)} {...props} />
  );
}
function HeaderTitle({ className, ...props }: TextProps) {
  return (
    <Text
      as="h1"
      fontWeight="medium"
      className={cn('pm-c-modal__header-title', className)}
      scale="heading"
      id={MODAL.description}
      {...props}
    />
  );
}
function Header({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'header'>) {
  return <header className={cn('pm-c-modal__header', className)} {...props} />;
}
function Modal({ children, onHide, show }: ModalProps) {
  const motionConfig = useContext(MotionConfigContext) as {
    transition: { duration: number };
  };
  const refModal = useRef<HTMLElement>(null);
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
      setTimeout(() => {
        Portal.unmount();
      }, motionConfig.transition?.duration * 1000);
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
            <motion.main
              ref={refModal}
              initial={{ y: 30, scale: 0.9 }}
              animate={{ y: 0, scale: 1 }}
              exit={{ y: 20, scale: 0.9 }}
              tabIndex={-1}
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
                >
                  <RemoveOutlinedIcon />
                </Button>
              )}
              {children}
            </motion.main>
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
