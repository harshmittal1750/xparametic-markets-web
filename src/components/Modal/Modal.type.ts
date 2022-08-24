import React from 'react';

import { TextProps } from 'components/Text';

export type ModalProps = React.PropsWithChildren<{
  show: boolean;
  onHide?(): void;
}>;

export type ModalFooterProps = React.ComponentPropsWithoutRef<'footer'>;

export type ModalSectionTextProps = TextProps;

export type ModalSectionProps = React.ComponentPropsWithoutRef<'section'>;

export type ModalHeaderTitleProps = TextProps;

export type ModalHeaderProps = React.ComponentPropsWithoutRef<'header'>;
