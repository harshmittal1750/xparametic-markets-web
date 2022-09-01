import { useEffect, useRef } from 'react';

import { useEnhancedRefProps } from './useEnhancedRef.type';

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
    const srEls = ref.current?.querySelectorAll(
      'a[href], button:not([disabled]), textarea, input, select'
    );

    if (trapFocus) {
      if (document.activeElement !== ref.current) {
        if (ref.current?.tabIndex === -1) {
          ref.current?.setAttribute('tabIndex', '0');
        }
        ref.current?.focus();
      }
    }
  });

  return ref;
}
