import { useCallback, useState } from 'react';

export default function useRect<E extends HTMLElement>() {
  const [rect, setRect] = useState<DOMRect | null>(null);
  const ref = useCallback((node: E | null) => {
    if (node !== null) setRect(node.getBoundingClientRect());
  }, []);

  return [ref, rect] as const;
}
