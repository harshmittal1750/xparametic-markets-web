import { useMemo } from 'react';

import { createFocusTrap } from 'helpers';

export enum Trap {
  START = 'start',
  END = 'end'
}

export default function useFocustrappers<V extends HTMLElement | null>() {
  const trapStart = createFocusTrap(Trap.START);
  const trapEnd = createFocusTrap(Trap.END);

  return useMemo(
    () => ({
      start: trapStart,
      end: trapEnd,
      insertOn(node?: V) {
        node?.insertBefore(trapStart, node.firstChild);
        node?.appendChild(trapEnd);
      },
      isOn(node?: V) {
        return node?.contains(trapStart) || node?.contains(trapEnd);
      }
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
}
