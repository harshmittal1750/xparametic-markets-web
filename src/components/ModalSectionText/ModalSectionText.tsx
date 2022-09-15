import cn from 'classnames';

import Text from 'components/Text';

import type { ModalSectionTextProps } from './ModalSectionText.type';

export default function ModalSectionText({
  className,
  ...props
}: ModalSectionTextProps) {
  return (
    <Text
      className={cn('pm-c-modal__section-text', className)}
      scale="caption"
      {...props}
    />
  );
}
