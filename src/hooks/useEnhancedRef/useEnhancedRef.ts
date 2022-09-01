import { useEffect, useRef } from 'react';

import { edgeOf } from 'helpers';

import { useEnhancedRefProps } from './useEnhancedRef.type';
import { srElsList } from './useEnhancedRef.util';

export default function useEnhancedRef<V extends HTMLElement>({
  onClickOutside,
  trapFocus
}: useEnhancedRefProps) {
  const ref = useRef<V>(null);

  useEffect(() => {
    function handleOutsideClick(event: MouseEvent) {
      if (!ref.current?.contains(event.target as Node)) {
        onClickOutside?.();
      }
    }

    window.addEventListener('click', handleOutsideClick);

    return () => {
      window.removeEventListener('click', handleOutsideClick);
    };
  }, [onClickOutside]);
  useEffect(() => {
    const { current: node } = ref;
    const srEls: Partial<Array<Element>> = [];

    node?.querySelectorAll(srElsList).forEach(el => srEls.push(el));

    const [elStart, elEnd] = edgeOf(srEls);

    if (trapFocus) {
      if (document.activeElement !== node) {
        if (node?.tabIndex === -1) {
          node?.setAttribute('tabIndex', '0');
        }
        node?.focus();
      }
    }
  });

  return ref;
}
