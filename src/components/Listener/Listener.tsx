/* eslint-disable no-param-reassign */
import React, {
  Children,
  cloneElement,
  useCallback,
  useEffect,
  useRef
} from 'react';

import { focusableElementsList } from './Listener.util';

function Clickaway() {}
function Focustrap<E extends HTMLElement>({
  children
}: React.PropsWithChildrenElement) {
  const ref = useRef<E | null>(null);
  const handleBlur = useCallback(
    (event: React.FocusEvent<E>) => {
      const focusableElements = event.currentTarget?.querySelectorAll(
        focusableElementsList
      );
      const focusableElementFirst = focusableElements?.[0] as HTMLElement;
      const focusableElementLast = focusableElements?.[
        focusableElements.length - 1
      ] as HTMLElement;

      requestAnimationFrame(() => {
        const test =
          event.relatedTarget === focusableElementLast &&
          !event.currentTarget?.contains(event.relatedTarget as Node);

        if (test) {
          focusableElementFirst.focus();
        }
      });

      children.props.onBlur?.(event);
    },
    [children.props]
  );
  const handleRef = useCallback(
    child => (node: E | null) => {
      ref.current = node;

      if (typeof child.ref === 'function') child.ref?.(node);
      else if (child.ref != null) child.ref.current = node;
      else child.ref = node;
    },
    []
  );

  useEffect(() => {
    ref?.current?.focus();
  }, []);

  return Children.only(
    cloneElement(children, {
      ref: handleRef(children),
      tabIndex: 0,
      onBlur: handleBlur
    })
  );
}

export default { Clickaway, Focustrap };
