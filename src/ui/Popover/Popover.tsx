import cn from 'classnames';
import { useTheme } from 'ui';

import Modal, { ModalProps } from 'components/Modal';

import popoverClasses from './Popover.module.scss';

interface PopoverProps<E extends HTMLElement>
  extends Omit<
    ModalProps,
    | 'show'
    | 'disableGutters'
    | 'disableOverlay'
    | 'fullWidth'
    | 'initial'
    | 'animate'
    | 'exit'
    | 'style'
  > {
  show: E | null;
  position: `${'top' | 'bottom'}${'Left' | 'Right'}` | 'center';
}

const defaultPopoverSx = {
  initial: {
    bottom: -240
  },
  animate: {
    bottom: 0
  },
  exit: {
    bottom: -240
  }
};

function getPopoverSx<E extends HTMLElement>(
  position: PopoverProps<E>['position'],
  element: E | null
) {
  const rect = element?.getBoundingClientRect();

  return {
    style: {
      left: rect?.left,
      top: `calc(${rect?.height}px + var(--grid-margin))`,
      width: rect?.width
    }
  };
}

export default function Popover<E extends HTMLElement>({
  className,
  show,
  position,
  ...props
}: PopoverProps<E>) {
  const theme = useTheme();
  const popoverSx = getPopoverSx(position, show);

  return (
    <Modal
      disableGutters
      disableOverlay={theme.device.isDesktop}
      fullWidth={!theme.device.isDesktop}
      show={!!show}
      className={{
        dialog: cn(popoverClasses.dialog, className?.dialog),
        ...className
      }}
      {...(theme.device.isDesktop ? popoverSx : defaultPopoverSx)}
      {...props}
    />
  );
}
