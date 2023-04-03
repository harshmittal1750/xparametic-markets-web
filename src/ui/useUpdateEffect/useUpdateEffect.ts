import { useLayoutEffect, useRef } from 'react';

/**
 * Fires the effect callback just after updates. Has the same signature as `useLayoutEffect`.
 */
export default function useUpdateEffect(
  ...args: Parameters<typeof useLayoutEffect>
) {
  const isMountPhase = useRef(true);

  useLayoutEffect(() => {
    if (isMountPhase.current) isMountPhase.current = false;
    else args[0]();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, args?.[1]);
}
