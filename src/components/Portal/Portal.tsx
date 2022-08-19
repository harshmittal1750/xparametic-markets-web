import { ReactNode, useEffect } from 'react';
import { createPortal } from 'react-dom';

type PortalProps = {
  show: boolean;
  children: ReactNode;
};

const portal = document.createElement('div');

export default function Portal({ show, children }: PortalProps) {
  const root = document.querySelector('[data-theme="dark"]');

  useEffect(() => {
    return () => {
      if (document.body.contains(portal)) {
        document.body.style.overflow = '';
        portal.remove();
        root?.removeChild(portal);
      }
    };
  }, [root]);

  if (show) {
    root?.appendChild(portal);
    portal?.classList.add('width-full', 'height-full', 'fixed-left', 'z-modal');
    document.body.style.overflow = 'hidden';

    return createPortal(children, portal);
  }

  return null;
}
