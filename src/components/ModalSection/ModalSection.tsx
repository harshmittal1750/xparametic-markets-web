import cn from 'classnames';

import type { ModalSectionProps } from './ModalSection.type';

export default function ModalSection({
  className,
  ...props
}: ModalSectionProps) {
  return (
    <section className={cn('pm-c-modal__section', className)} {...props} />
  );
}
