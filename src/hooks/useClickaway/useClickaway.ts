import React, { useEffect, useRef } from 'react';

import usePrevious from 'hooks/usePrevious';

/**
 * Invokes the `onClickaway` args when the user clicks outside a specific node, if all dependencies is true.
 * @param {{ current: HTMLElement }} ref React ref object forked from the specified node. See [useRef](https://reactjs.org/docs/hooks-reference.html#useref).
 * @param {Function} onClickaway Callback that will be invoked when the user clicks outside the specified node.
 * @param {boolean[]} deps List os dependencies that defines if wheter the `onClickaway` callback is called of not.
 */
export default function useClickaway<V extends HTMLElement>(
  ref: React.RefObject<V>,
  onClickaway: () => void,
  deps: boolean[] = [true]
) {
  const timer = useRef<Partial<number>>();
  const { current: tabindexPrev } = usePrevious(ref.current?.tabIndex);

  useEffect(() => {
    const { current: node } = ref;

    function handleFocus() {
      window.clearTimeout(timer.current);
    }
    function handleBlur() {
      timer.current = window.setTimeout(() => {
        if (deps.every(Boolean)) onClickaway?.();
      });
    }

    if (node?.tabIndex === -1) node?.setAttribute('tabIndex', '0');
    node?.addEventListener('focusin', handleFocus);
    node?.addEventListener('focusout', handleBlur);

    return () => {
      if (tabindexPrev === -1) node?.setAttribute('tabIndex', '-1');
      node?.removeEventListener('focusin', handleFocus);
      node?.removeEventListener('focusout', handleBlur);
      handleFocus();
    };
  }, [deps, onClickaway, ref, tabindexPrev]);
}
