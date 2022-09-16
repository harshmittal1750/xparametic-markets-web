import React, { useEffect, useMemo, useRef } from 'react';

import usePrevious from 'hooks/usePrevious';

export default function useFocustrap<V extends HTMLElement>(
  ref: React.RefObject<V>,
  focusableElements: string[],
  trappersId: Record<'start' | 'end', string>
) {
  const focusTrap = useMemo(
    () =>
      Object.keys(trappersId).reduce((acc, cur) => {
        const trapEl = document.createElement('span');

        trapEl.setAttribute('tabIndex', '0');
        trapEl.dataset.testid = trappersId[cur];

        return {
          ...acc,
          [cur]: trapEl
        };
      }, {} as Record<'start' | 'end', HTMLSpanElement>),
    [trappersId]
  );
  const timer = useRef<Partial<number>>();
  const { current: focusPrev } = usePrevious<Element | null>(
    document.activeElement
  );

  useEffect(() => {
    const { current: node } = ref;
    const hasFocusTrap =
      node?.contains(focusTrap.start) && node?.contains(focusTrap.end);

    if (!hasFocusTrap) {
      node?.insertBefore(focusTrap.start, node.firstChild);
      node?.appendChild(focusTrap.end);
    }
    focusTrap.start.focus();

    return () => {
      if (hasFocusTrap) {
        node?.removeChild(focusTrap.start);
        node?.removeChild(focusTrap.end);
      }
      (focusPrev as HTMLElement)?.focus();
    };
  }, [focusPrev, focusTrap, ref]);
  useEffect(() => {
    const { current: node } = ref;
    const els = node?.querySelectorAll(focusableElements?.join(', '));
    const focusEdge = {
      start: els?.[0] as HTMLElement,
      end: els?.[els.length - 1] as HTMLElement
    };

    function handleBlur() {
      window.clearTimeout(timer.current);
    }
    function handleFocus(event: FocusEvent) {
      if (event.target === focusTrap.start) {
        window.requestAnimationFrame(() => {
          timer.current = window.setTimeout(() => focusEdge.end.focus());
        });
      }
      if (event.target === focusTrap.end) {
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
      handleBlur();
    };
  });
}
