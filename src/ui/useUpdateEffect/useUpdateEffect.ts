import { useEffect, useLayoutEffect, useRef } from 'react';

export default function useUpdateEffect(...args: Parameters<typeof useEffect>) {
  const didMount = useRef(true);

  useLayoutEffect(() => {
    if (didMount.current) {
      didMount.current = false;
    } else args[0]();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, args[1]);
}
