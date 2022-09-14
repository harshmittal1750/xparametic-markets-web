import { createContext, useContext } from 'react';

import type { ModalContextProps } from './useModalContext.type';

export const ModalContext = createContext<ModalContextProps>({
  name: '',
  onHide: undefined,
  labelledby: '',
  describedby: ''
});

ModalContext.displayName = 'ModalContext';

export default function useModalContext() {
  return useContext(ModalContext);
}
