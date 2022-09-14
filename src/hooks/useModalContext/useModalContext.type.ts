import { ModalProps } from 'components';

export type ModalContextProps = Omit<ModalProps, 'show'> &
  Record<'labelledby' | 'describedby', string>;
