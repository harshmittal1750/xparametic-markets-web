import cn from 'classnames';

import adornmentClasses from './Adornment.module.scss';

export const adornmentProps = {
  $edge: ['start', 'end']
} as const;

export interface AdornmentProps
  extends Pick<
    React.ComponentPropsWithoutRef<'span'>,
    'children' | 'className'
  > {
  $edge: typeof adornmentProps.$edge[number];
}

export default function Adornment({
  $edge,
  className,
  ...props
}: AdornmentProps) {
  return (
    <span
      className={cn({
        [adornmentClasses.edgeStart]: $edge === 'start',
        [adornmentClasses.edgeEnd]: $edge === 'end',
        className
      })}
      {...props}
    />
  );
}
