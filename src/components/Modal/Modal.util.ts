import { createContext } from 'react';

import { ModalContextProps } from './Modal.type';

export const MODAL = {
  title: 'modal-title',
  description: 'modal-description'
};
export const ModalContext = createContext<ModalContextProps>({
  name: '',
  onHide: undefined
});

ModalContext.displayName = 'ModalContext';
