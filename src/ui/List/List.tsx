import cn from 'classnames';

import ListClasses from './List.module.scss';
import { ListProps } from './List.type';

export default function List({ className, ...props }: ListProps) {
  return (
    <ul role="listbox" className={cn(ListClasses.root, className)} {...props} />
  );
}
