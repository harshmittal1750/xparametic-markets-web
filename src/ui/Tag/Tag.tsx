import cn from 'classnames';

import tagClasses from './Tag.module.scss';

interface TagProps extends React.ComponentPropsWithoutRef<'button'> {
  $color: 'default';
  $size: 'sm';
  $variant: 'subtle';
}

export default function Tag({ $size, ...props }: TagProps) {
  return (
    <button
      type="button"
      className={cn(tagClasses.root, {
        [tagClasses.sizeSm]: $size === 'sm'
      })}
      {...props}
    />
  );
}
