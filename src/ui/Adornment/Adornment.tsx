import cn from 'classnames';

import AdornmentClasses from './Adornment.module.scss';
import { AdornmentProps } from './Adornment.type';

export default function Adornment({ $edge, ...props }: AdornmentProps) {
  return (
    <span
      className={cn({
        [AdornmentClasses.start]: $edge === 'start',
        [AdornmentClasses.end]: $edge === 'end'
      })}
      {...props}
    />
  );
}
