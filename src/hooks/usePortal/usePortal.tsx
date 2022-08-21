import React, { useEffect, useState, useCallback } from 'react';
import { createPortal } from 'react-dom';

type UsePortalProps = {
  initialMount?: boolean;
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
  initialMount = false,
  onMount,
  onUnmount,
  root
}: UsePortalProps) {
  const [_mount, setMount] = useState<boolean>(initialMount);
  const handleMount = useCallback(setMount, [setMount]);
  const handlePortal = useCallback(
    (_props: React.PropsWithChildren<{}>) => {
      if (root == null || !initialMount) return null;

      const props = { root, onMount, onUnmount, ..._props };

      return <Portal {...props} />;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [initialMount, root]
  );

  return Object.assign(handlePortal, {
    mount: handleMount
  });
}
