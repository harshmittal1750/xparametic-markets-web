import cn from 'classnames';

import listClasses from './List.module.scss';

interface ListProps extends React.ComponentPropsWithoutRef<'ul'> {
  $rounded?: boolean;
  $disableGutters?: boolean;
}

export default function List({
  className,
  $rounded,
  $disableGutters,
  ...props
}: ListProps) {
  return (
    <ul
      role="listbox"
      className={cn(
        {
          [listClasses.rounded]: $rounded,
          [listClasses.gutters]: !$disableGutters
        },
        className
      )}
      {...props}
    />
  );
}
