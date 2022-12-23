import { useCallback, useState } from 'react';

export default function useRect<E extends HTMLElement>() {
  const [rect, setRect] = useState<DOMRect>(() => ({
    bottom: 0,
    height: 0,
    left: 0,
    right: 0,
    top: 0,
    width: 0,
    x: 0,
    y: 0,
    toJSON: () => null
  }));
  const ref = useCallback((node: E | null) => {
    if (node !== null) setRect(node.getBoundingClientRect());
  }, []);

  return [ref, rect] as const;
}
