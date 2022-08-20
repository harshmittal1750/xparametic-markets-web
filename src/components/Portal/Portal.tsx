import { ReactNode, useEffect } from 'react';
import { createPortal } from 'react-dom';

type PortalProps = {
  children: ReactNode;
};

export default function Portal({ children }: PortalProps) {
  const root = document.querySelector('[data-theme="dark"]');

  useEffect(() => { 
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.removeAttribute('style');
    };
  }, [root]);

  return root != null ? createPortal(children, root) : null;
}
