import { useEffect, useRef } from 'react';

import { UseClickOutsideProps } from './useClickOutside.type';

export default function useClickOutside<V extends HTMLElement>({
  onClickOutside
}: UseClickOutsideProps) {
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
