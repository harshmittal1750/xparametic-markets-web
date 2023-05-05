import cn from 'classnames';
import { useTheme } from 'ui';

import { Modal } from 'components';
import type { ModalProps } from 'components';

import popoverClasses from './Popover.module.scss';

const positionBlock = ['top', 'bottom'] as const;
const positionInline = ['Right', 'Left'] as const;

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
  > {
  show: E | null;
  position: `${PositionBlock}${PositionInline}`;
  disableMobileSheet?: boolean;
}

function getPopoverSx<E extends HTMLElement>(
  position: PopoverProps<E>['position'],
  element: E | null
): React.CSSProperties {
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
  const scrollWidth = window.innerWidth - document.documentElement.clientWidth;

  return {
    [positionX]: {
      left: rect ? rect.left + scrollWidth : 0,
      right:
        Math.abs(Math.round(rect?.right || 0) - window.innerWidth) - scrollWidth
    }[positionX],
    [positionY]: {
      top: rect ? rect.top + rect.height : 0,
      bottom: window.innerHeight - (rect?.top || 0)
    }[positionY],
    width: rect?.width
  };
}

export default function Popover<E extends HTMLElement>({
  className,
  show,
  position,
  disableMobileSheet,
  style,
  ...props
}: PopoverProps<E>) {
  const theme = useTheme();

  return (
    <Modal
      disableGutters
      show={!!show}
      disableOverlay={disableMobileSheet ? undefined : theme.device.isDesktop}
      fullWidth={disableMobileSheet ? undefined : !theme.device.isDesktop}
      style={{
        ...(theme.device.isDesktop ? getPopoverSx(position, show) : {}),
        ...style
      }}
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
      {...(!theme.device.isDesktop && {
        initial: { bottom: -240 },
        animate: { bottom: 0 },
        exit: { bottom: -240 }
      })}
      {...props}
    />
  );
}
