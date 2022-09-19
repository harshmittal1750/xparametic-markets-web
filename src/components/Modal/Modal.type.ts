import type { HTMLMotionProps } from 'framer-motion';

export interface ModalProps extends HTMLMotionProps<'div'> {
  onHide?(): void;
  show: boolean;
}
