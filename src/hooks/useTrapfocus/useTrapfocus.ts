import React, { useEffect, useLayoutEffect, useRef } from 'react';

import usePrevious from 'hooks/usePrevious';

import { focusEdge } from './useTrapfocus.util';

export default function useTrapfocus<V extends HTMLElement>(
  ref: React.RefObject<V>
) {
  const timer = useRef<Partial<number>>();
  // todo: this is losing previous when parent updates state
  const { current: focusPrev } = usePrevious<Element | null>(
    document.activeElement
  );

  useEffect(() => {
    const { current: node } = ref;
    const [start] = focusEdge(node);
    start?.focus();

    return () => {
      (focusPrev as HTMLElement)?.focus();
    };
  }, [focusPrev, ref]);
  useLayoutEffect(() => {
    const { current: node } = ref;
    const [start, end] = focusEdge(node);
    const trapStart = document.getElementById('trap-start') as V;
    const trapEnd = document.getElementById('trap-end') as V;

    function handleBlur() {
      window.clearTimeout(timer.current);
    }
    function handleFocus(event: FocusEvent) {
      if (event.target === trapStart) {
        window.requestAnimationFrame(() => {
          timer.current = window.setTimeout(() => end.focus());
        });
      }
      if (event.target === trapEnd) {
        window.requestAnimationFrame(() => {
          timer.current = window.setTimeout(() => start.focus());
        });
      }
    }

    node?.addEventListener('focusout', handleBlur);
    node?.addEventListener('focusin', handleFocus);

    return () => {
      node?.removeEventListener('focusout', handleBlur);
      node?.removeEventListener('focusin', handleFocus);
    };
  });
}
