import React from 'react';

export type ModalProps = React.PropsWithChildren<{
  name: string;
  onHide?(): void;
  show: boolean;
}>;
