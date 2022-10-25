import type React from 'react';

import cn from 'classnames';

import ListClasses from './List.module.scss';

export default function List({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'ul'>) {
  return (
    <ul role="listbox" className={cn(ListClasses.root, className)} {...props} />
  );
}
