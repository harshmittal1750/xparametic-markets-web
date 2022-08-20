import { ReactNode } from 'react';

import { AnimatePresence, motion } from 'framer-motion';

import Portal from 'components/Portal';

type ModalProps = {
  children: ReactNode;
  show: boolean;
};

export default function Modal({ children, show }: ModalProps) {
  return show ? (
    <Portal>
      <div className="pm-c-modal__overlay">
        <AnimatePresence>
          <motion.div
            layout
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            role="status"
          >
            <section
              role="dialog"
              tabIndex={-1}
              aria-modal="true"
              className="pm-c-modal"
            >
              <div className="pm-c-modal__content">{children}</div>
            </section>
          </motion.div>
        </AnimatePresence>
      </div>
    </Portal>
  ) : null;
}
