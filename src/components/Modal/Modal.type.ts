import type { HTMLMotionProps } from 'framer-motion';

type ModalComponents = 'root' | 'backdrop' | 'dialog';

export interface ModalProps extends Omit<HTMLMotionProps<'div'>, 'className'> {
  onHide?(): void;
  show: boolean;
  className?: Partial<Record<ModalComponents, string>>;
  centered?: boolean;
  size?: 'sm' | 'md' | 'lg';
  fullScreen?: boolean;
  fullWidth?: boolean;
  disableGutters?: boolean;
  disablePortal?: boolean;
  disableOverlay?: boolean;
}
