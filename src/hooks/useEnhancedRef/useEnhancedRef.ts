import { useEffect, useRef } from 'react';

import { useEnhancedRefProps } from './useEnhancedRef.type';

export default function useEnhancedRef<V extends HTMLElement>({
  onClickOutside
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

  return ref;
}
