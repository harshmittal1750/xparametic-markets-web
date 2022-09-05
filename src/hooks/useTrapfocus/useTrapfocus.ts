import React, { useEffect, useRef, useState } from 'react';

import usePrevious from 'hooks/usePrevious';

import { focusEdge } from './useTrapfocus.util';

export default function useTrapfocus<V extends HTMLElement>(
  ref: React.RefObject<V>
) {
  const [focusEnd, setFocusEnd] = useState(false);
  const timer = useRef<Partial<number>>();
  // todo: this is losing previous when parent updates state
  const { current: focusPrev } = usePrevious<Element | null>(
    document.activeElement
  );

  useEffect(() => {
    const { current: node } = ref;
    const [start, end] = focusEdge(node);

    // todo: this is jumping out
    function handleBlur(e) {
      e.preventDefault();

      if (focusEnd && end === e.target) {
        window.requestAnimationFrame(() => {
          timer.current = window.setTimeout(() => start.focus());
        });
      }
    }
    function handleFocus(e) {
      e.preventDefault();
      setFocusEnd(e.target === end);
      window.clearTimeout(timer.current);
    }

    start?.focus();
    node?.addEventListener('focusout', handleBlur, true);
    node?.addEventListener('focusin', handleFocus, true);

    return () => {
      (focusPrev as HTMLElement)?.focus();
      node?.removeEventListener('focusout', handleBlur, true);
      node?.removeEventListener('focusin', handleFocus, true);
    };
  });
}
