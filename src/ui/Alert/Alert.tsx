import cn from 'classnames';
import type { ContainerProps } from 'ui/Container';
import Container from 'ui/Container';

import alertClasses from './Alert.module.scss';

interface AlertProps extends ContainerProps<'div'> {
  $type?: 'warning';
  $variant?: 'subtle';
}

export default function Alert({
  $type,
  $variant,
  className,
  ...props
}: AlertProps) {
  return (
    <Container
      $as="div"
      role="alert"
      aria-busy="false"
      className={cn(
        alertClasses.root,
        {
          [alertClasses.typeWarning]: $type === 'warning',
          [alertClasses.variantSubtle]: $variant === 'subtle'
        },
        className
      )}
      {...props}
    />
  );
}
