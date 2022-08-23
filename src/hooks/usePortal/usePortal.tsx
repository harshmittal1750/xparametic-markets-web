import React, { useEffect, useCallback, useState } from 'react';
import { createPortal } from 'react-dom';

type UsePortalProps = {
  onMount?: React.EffectCallback;
  onUnmount?(): void;
  root: Element | null;
};
type PortalProps = {
  root: Element;
  onMount: UsePortalProps['onMount'];
  onUnmount: UsePortalProps['onUnmount'];
};

function Portal({
  children,
  root,
  onMount,
  onUnmount
}: React.PropsWithChildren<PortalProps>) {
  useEffect(() => {
    onMount?.();

    return onUnmount;
  }, [onMount, onUnmount]);

  return createPortal(children, root);
}

export default function usePortal({
  onMount,
  onUnmount,
  root
}: UsePortalProps) {
  const [mount, setMount] = useState<boolean>(false);
  const handleMount = useCallback(setMount, [setMount]);
  const handleUnmount = useCallback(() => setMount(false), [setMount]);
  const handlePortal = useCallback(
    (_props: React.PropsWithChildren<Record<string, unknown>>) => {
      if (!root || !mount) return null;

      const props = { root, onMount, onUnmount, ..._props };

      return <Portal {...props} />;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [mount, root]
  );

  return Object.assign(handlePortal, {
    mount: handleMount,
    unmount: handleUnmount
  });
}
