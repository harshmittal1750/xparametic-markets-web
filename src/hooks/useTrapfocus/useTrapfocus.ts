import React, { useEffect, useRef } from 'react';

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
    const [start, end] = focusEdge(node);
    const trapStart = document.getElementById('trap-start') as V;
    const trapEnd = document.getElementById('trap-end') as V;

    function handleBlur(e) {
      if (trapEnd === e.target) {
        window.requestAnimationFrame(() => {
          timer.current = window.setTimeout(() => trapStart?.focus());
        });
      }
      e.preventDefault();
    }
    // todo: this is jumping in now
    function handleFocus(e) {
      if (e.target === trapEnd) {
        start.focus();
      }
      window.clearTimeout(timer.current);
    }

    start?.focus();
    node?.addEventListener('focusout', handleBlur);
    node?.addEventListener('focusin', handleFocus);

    return () => {
      (focusPrev as HTMLElement)?.focus();
      node?.removeEventListener('focusout', handleBlur);
      node?.removeEventListener('focusin', handleFocus);
    };
  });
}
