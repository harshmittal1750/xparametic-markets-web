import cn from 'classnames';

import Text from 'components/Text';

import type { ModalHeaderTitleProps } from './ModalHeaderTitle.type';

export default function ModalHeaderTitle({
  className,
  ...props
}: ModalHeaderTitleProps) {
  return (
    <Text
      as="h2"
      fontWeight="medium"
      className={cn('pm-c-modal__header-title', className)}
      scale="heading"
      {...props}
    />
  );
}
