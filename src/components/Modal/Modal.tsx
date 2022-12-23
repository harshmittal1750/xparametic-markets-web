import { Fragment, useCallback, useEffect, useRef } from 'react';

import cn from 'classnames';
import { AnimatePresence, motion } from 'framer-motion';

import {
  usePortal,
  usePrevious,
  useFocustrap,
  useMount,
  useTimeoutEffect
} from 'hooks';

import ModalClasses from './Modal.module.scss';
import type { ModalProps } from './Modal.type';
import { modalTrappersId } from './Modal.util';

function ModalWrapper({
  children,
  show,
  showPrev,
  didMount
}: React.PropsWithChildren<{
  showPrev?: boolean | null;
  show?: boolean;
  didMount?: boolean;
}>) {
  const Portal = usePortal({
    root: document.body,
    onEffect() {
      document.body.style.overflow = 'hidden';

      return () => {
        document.body.removeAttribute('style');
      };
    }
  });
  const timeoutEffect = useTimeoutEffect();

  useEffect(() => {
    if (showPrev && !show) {
      if (didMount) timeoutEffect(Portal.unmount, 300);
    } else {
      Portal.mount(!!show);
    }
  }, [Portal, didMount, show, showPrev, timeoutEffect]);

  return <Portal>{children}</Portal>;
}
export default function Modal({
  onHide,
  show,
  className,
  centered,
  size,
  fullScreen,
  fullWidth,
  disableGutters,
  disablePortal,
  disableOverlay,
  ...props
}: ModalProps) {
  const { current: didMount } = useMount();
  const { current: showPrev } = usePrevious(show);
  const ref = useRef<HTMLDivElement>(null);
  const handleRootKeydown = useCallback(
    (event: React.KeyboardEvent) => {
      if (onHide) {
        if (event.key === 'Escape') onHide();
      }
    },
    [onHide]
  );
  const handleBackdropClick = useCallback(() => onHide?.(), [onHide]);
  const ModalWrapperComponent = disablePortal ? Fragment : ModalWrapper;

  useFocustrap(
    ref,
    ['a[href]', 'button:not([disabled])', 'textarea', 'input', 'select'],
    modalTrappersId
  );

  return (
    <ModalWrapperComponent
      {...(!disablePortal && { show, showPrev, didMount })}
    >
      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="presentation"
            className={cn(
              ModalClasses.root,
              {
                [ModalClasses.flex]: centered,
                [ModalClasses.gutters]: !disableGutters
              },
              className?.root
            )}
            onKeyDown={handleRootKeydown}
          >
            <div
              aria-hidden="true"
              className={cn(
                ModalClasses.backdrop,
                {
                  [ModalClasses.overlay]: !disableOverlay
                },
                className?.backdrop
              )}
              onClick={handleBackdropClick}
            />
            <motion.div
              ref={ref}
              initial={{ y: 8 }}
              animate={{ y: 0 }}
              exit={{ y: 8 }}
              role="dialog"
              aria-modal="true"
              className={cn(
                ModalClasses.dialog,
                {
                  [ModalClasses.center]: centered,
                  [ModalClasses.sm]: size === 'sm',
                  [ModalClasses.md]: size === 'md',
                  [ModalClasses.lg]: size === 'lg',
                  [ModalClasses.fullScreen]: fullScreen,
                  [ModalClasses.fullWidth]: fullWidth
                },
                className?.dialog
              )}
              {...props}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </ModalWrapperComponent>
  );
}
