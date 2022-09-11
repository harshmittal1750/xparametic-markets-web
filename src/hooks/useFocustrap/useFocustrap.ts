import React, { useEffect, useMemo, useRef } from 'react';

import { createFocusTrap, getFocusEdge } from 'helpers';

import usePrevious from 'hooks/usePrevious';

export enum Trap {
  START = 'start',
  END = 'end'
}

export default function useFocustrap<V extends HTMLElement>(
  ref: React.RefObject<V>
) {
  const focusTrappers = useMemo(
    () => ({
      start: createFocusTrap(Trap.START),
      end: createFocusTrap(Trap.END)
    }),
    []
  );
  const timer = useRef<Partial<number>>();
  const { current: focusPrev } = usePrevious<Element | null>(
    document.activeElement
  );

  useEffect(() => {
    const { current: node } = ref;

    if (
      !node?.contains(focusTrappers.start) ||
      !node?.contains(focusTrappers.end)
    ) {
      node?.insertBefore(focusTrappers.start, node.firstChild);
      node?.appendChild(focusTrappers.end);
    }
    focusTrappers.start.focus();

    return () => (focusPrev as HTMLElement)?.focus();
  }, [focusPrev, focusTrappers, ref]);
  useEffect(() => {
    const { current: node } = ref;
    const focusEdge = getFocusEdge(node);

    function handleBlur() {
      window.clearTimeout(timer.current);
    }
    function handleFocus(event: FocusEvent) {
      if (event.target === focusTrappers.start) {
        window.requestAnimationFrame(() => {
          timer.current = window.setTimeout(() => focusEdge.end.focus());
        });
      }
      if (event.target === focusTrappers.end) {
        window.requestAnimationFrame(() => {
          timer.current = window.setTimeout(() => focusEdge.start.focus());
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
