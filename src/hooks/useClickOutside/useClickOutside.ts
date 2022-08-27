import React, { useEffect, useRef, useState } from 'react';

export default function useClickOutside<V extends HTMLElement>(
  onClickOutside?: (_isClickOutside?: boolean) => void
): [React.RefObject<V>, boolean] {
  const ref = useRef<V>(null);
  const [isClickOutside, setIsClickOutside] = useState(false);

  useEffect(() => {
    function handleOutsideClick(event: MouseEvent) {
      setIsClickOutside(!ref.current?.contains(event.target as Node));
      onClickOutside?.(isClickOutside);
    }

    window.addEventListener('click', handleOutsideClick);

    return () => {
      window.removeEventListener('click', handleOutsideClick);
    };
  }, [isClickOutside, onClickOutside]);

  return [ref, isClickOutside];
}
