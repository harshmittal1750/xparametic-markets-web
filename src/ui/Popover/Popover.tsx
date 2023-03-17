import { useCallback, useState } from 'react';

import cn from 'classnames';
import { useRect, useTheme } from 'ui';

import Modal from 'components/Modal';

import networSelectorClasses from './Popover.module.scss';

type PopoverProps = React.PropsWithChildren<{
  responsive?: boolean;
  className?: string;
  label: React.ReactNode;
}>;

export default function Popover({
  responsive,
  className,
  children,
  label
}: PopoverProps) {
  const theme = useTheme();
  const [rectButton, setRectButton] = useState<DOMRect | null>(null);
  const [refModal, rectModal] = useRect();
  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) =>
      setRectButton(event.currentTarget.getBoundingClientRect()),
    []
  );
  const handleHide = useCallback(() => setRectButton(null), []);
  const isDesktop = !responsive || theme.device.isDesktop;

  return (
    <>
      <button
        type="button"
        onClick={handleClick}
        className={cn(networSelectorClasses.root, className)}
      >
        {label}
      </button>
      <Modal
        ref={refModal}
        disableGutters
        onHide={handleHide}
        disableOverlay={isDesktop}
        fullWidth={!isDesktop}
        show={!!rectButton}
        className={{
          dialog: networSelectorClasses.dialog
        }}
        {...(isDesktop
          ? {
              style: {
                left: rectButton?.left,
                top: `calc(${rectButton?.top}px + ${rectButton?.height}px + var(--grid-margin))`,
                width: rectButton?.width
              }
            }
          : {
              initial: { bottom: -rectModal.height },
              animate: { bottom: 0 },
              exit: { bottom: -rectModal.height }
            })}
      >
        {children}
      </Modal>
    </>
  );
}
