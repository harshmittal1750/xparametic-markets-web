import { createContext, useContext } from 'react';

import { ModalContextProps } from './Modal.type';

export const MODAL_DATA = {
  title: 'modal-title',
  description: 'modal-description'
};
export const ModalContext = createContext<ModalContextProps>({
  name: '',
  onHide: undefined
});

export function useModalContext() {
  return useContext(ModalContext);
}

ModalContext.displayName = 'ModalContext';
