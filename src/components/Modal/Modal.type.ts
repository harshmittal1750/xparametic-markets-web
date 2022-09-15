import React from 'react';

export interface ModalProps extends React.ComponentPropsWithRef<'div'> {
  onHide?(): void;
  show: boolean;
}
