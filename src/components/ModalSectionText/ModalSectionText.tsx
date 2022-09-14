import cn from 'classnames';

import Text from 'components/Text';

import { useModalContext } from 'hooks';

import type { ModalSectionTextProps } from './ModalSectionText.type';

export default function ModalSectionText({
  className,
  ...props
}: ModalSectionTextProps) {
  const { name, describedby } = useModalContext();

  return (
    <Text
      className={cn('pm-c-modal__section-text', className)}
      scale="caption"
      id={`${name}-${describedby}`}
      {...props}
    />
  );
}
