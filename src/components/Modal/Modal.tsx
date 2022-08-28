import { useContext, useEffect, useMemo } from 'react';

import cn from 'classnames';
import { AnimatePresence, motion, MotionConfigContext } from 'framer-motion';

import { RemoveOutlinedIcon } from 'assets/icons';

import { Button } from 'components/Button';
import Text, { TextProps } from 'components/Text';

import { useClickOutside, usePortal, usePrevious } from 'hooks';

import {
  ModalFooterProps,
  ModalHeaderProps,
  ModalProps,
  ModalSectionProps
} from './Modal.type';
import { MODAL, ModalContext, useModalContext } from './Modal.util';

function Modal({ children, onHide, show, name }: ModalProps) {
  const motionConfig = useContext(MotionConfigContext) as {
    transition: { duration: number };
  };
  const { current: showPrev } = usePrevious(show);
  const [refModal] = useClickOutside<HTMLDivElement>(() => {
    if (showPrev && show) onHide?.();
  });
  const Portal = usePortal({
    root: document.body,
    onEffect() {
      document.body.style.overflow = 'hidden';

      return () => {
        document.body.removeAttribute('style');
      };
    }
  });
  const modalContextValue = useMemo(
    () => ({
      name,
      onHide
    }),
    [name, onHide]
  );

  useEffect(() => {
    if (showPrev && !show) {
      setTimeout(Portal.unmount, motionConfig.transition?.duration * 1000);
    } else {
      Portal.mount(show);
    }
  }, [Portal, showPrev, show, motionConfig.transition?.duration]);

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
            >
              <motion.div
                ref={refModal}
                initial={{ y: 16 }}
                animate={{ y: 0 }}
                exit={{ y: 16 }}
                role="dialog"
                aria-modal="true"
                aria-labelledby={`${name}-${MODAL.title}`}
                aria-describedby={`${name}-${MODAL.description}`}
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
function Header({ className, children, ...props }: ModalHeaderProps) {
  const { onHide } = useModalContext();

  return (
    <header className={cn('pm-c-modal__header', className)} {...props}>
      {children}
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
    </header>
  );
}
function HeaderTitle({ className, ...props }: TextProps) {
  const { name } = useModalContext();

  return (
    <Text
      as="h2"
      fontWeight="medium"
      className={cn('pm-c-modal__header-title', className)}
      scale="heading"
      id={`${name}-${MODAL.title}`}
      {...props}
    />
  );
}
function Section({ className, ...props }: ModalSectionProps) {
  return (
    <section className={cn('pm-c-modal__section', className)} {...props} />
  );
}
function SectionText({ className, ...props }: TextProps) {
  const { name } = useModalContext();

  return (
    <Text
      className={cn('pm-c-modal__section-text', className)}
      scale="caption"
      id={`${name}-${MODAL.description}`}
      {...props}
    />
  );
}
function Footer({ className, ...props }: ModalFooterProps) {
  return <footer className={cn('pm-c-modal__footer', className)} {...props} />;
}

export default Object.assign(Modal, {
  Header,
  HeaderTitle,
  Section,
  SectionText,
  Footer
});
