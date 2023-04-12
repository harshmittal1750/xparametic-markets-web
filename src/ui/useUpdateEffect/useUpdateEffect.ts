import { useLayoutEffect, useRef } from 'react';

/**
 * Fires the effect callback just after updates.
 * Has the same signature as `useLayoutEffect`, but with the dependency list required.
 */
export default function useUpdateEffect(
  effect: React.EffectCallback,
  deps: React.DependencyList
) {
  const isMountPhase = useRef(true);

  useLayoutEffect(() => {
    if (isMountPhase.current) isMountPhase.current = false;
    else effect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
