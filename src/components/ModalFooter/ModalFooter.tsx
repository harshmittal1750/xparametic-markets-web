import React from 'react';

import cn from 'classnames';

import type { ModalFooterProps } from './ModalFooter.type';

export default function ModalFooter({ className, ...props }: ModalFooterProps) {
  return <footer className={cn('pm-c-modal__footer', className)} {...props} />;
}
