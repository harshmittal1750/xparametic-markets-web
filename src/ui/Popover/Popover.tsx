import { useCallback } from 'react';

import cn from 'classnames';
import { useTheme } from 'ui';

import Modal, { ModalProps } from 'components/Modal';

import popoverClasses from './Popover.module.scss';

const positionInline = ['Right', 'Left'] as const;
const positionBlock = ['top', 'bottom'] as const;

type PositionBlock = typeof positionBlock[number];
type PositionInline = typeof positionInline[number];
export interface PopoverProps<E extends HTMLElement>
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
  position: `${PositionBlock}${PositionInline}`;
  disableMobileSheet?: boolean;
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
): Record<'style', React.CSSProperties> {
  const rect = element?.getBoundingClientRect();
  const positions = [...positionInline, ...positionBlock].reduce(
    (pre, cur) => ({
      ...pre,
      [cur]: position.includes(cur)
    }),
    {} as Record<PositionBlock | PositionInline, boolean>
  );
  const positionY = positions.bottom ? 'top' : 'bottom';
  const positionX = positions.Right ? 'right' : 'left';

  return {
    style: {
      [positionX]: {
        left: rect?.left,
        right: Math.abs(Math.round(rect?.right || 0) - window.innerWidth)
      }[positionX],
      [positionY]: {
        top: `calc(${rect?.height}px + var(--grid-margin))`,
        bottom: 0
      }[positionY],
      width: rect?.width
    }
  };
}

export default function Popover<E extends HTMLElement>({
  className,
  show,
  position,
  disableMobileSheet,
  ...props
}: PopoverProps<E>) {
  const theme = useTheme();
  const getSxProps = useCallback(() => {
    if (theme.device.isDesktop) return getPopoverSx(position, show);
    if (disableMobileSheet) return {};
    return defaultPopoverSx;
  }, [disableMobileSheet, position, show, theme.device.isDesktop]);

  return (
    <Modal
      disableGutters
      disableOverlay={disableMobileSheet ? undefined : theme.device.isDesktop}
      fullWidth={disableMobileSheet ? undefined : !theme.device.isDesktop}
      show={!!show}
      className={{
        dialog: cn(
          popoverClasses.dialog,
          {
            [popoverClasses.dialogSheet]: !disableMobileSheet
          },
          className?.dialog
        ),
        ...className
      }}
      {...getSxProps()}
      {...props}
    />
  );
}
