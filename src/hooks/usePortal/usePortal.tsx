import React, { useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';

type UsePortalProps = {
  mount?: boolean;
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
  mount = false,
  onMount,
  onUnmount,
  root
}: UsePortalProps) {
  const handlePortal = useCallback(
    (_props: React.PropsWithChildren<Record<string, unknown>>) => {
      if (root == null || !mount) return null;

      const props = { root, onMount, onUnmount, ..._props };

      return <Portal {...props} />;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [mount, root]
  );

  return handlePortal;
}
