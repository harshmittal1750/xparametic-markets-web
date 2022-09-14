import React from 'react';

import cn from 'classnames';

import { RemoveOutlinedIcon } from 'assets/icons';

import { Button } from 'components/Button';

import { useModalContext } from 'hooks';

import type { ModalHeaderProps } from './ModalHeader.type';

export default function ModalHeader({
  className,
  children,
  ...props
}: ModalHeaderProps) {
  const { onHide } = useModalContext();

  return (
    <header className={cn('pm-c-modal__header', className)} {...props}>
      {children}
      {onHide && (
        <Button
          variant="ghost"
          onClick={onHide}
          className="pm-c-modal__header-hide"
          aria-label="Hide"
        >
          <RemoveOutlinedIcon />
        </Button>
      )}
    </header>
  );
}
