import cn from 'classnames';

import type { ModalHeaderProps } from './ModalHeader.type';

export default function ModalHeader({ className, ...props }: ModalHeaderProps) {
  return <header className={cn('pm-c-modal__header', className)} {...props} />;
}
