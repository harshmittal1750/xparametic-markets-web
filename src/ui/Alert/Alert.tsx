import cn from 'classnames';
import Container from 'ui/Container';

import alertClasses from './Alert.module.scss';

interface AlertProps extends React.ComponentPropsWithoutRef<'div'> {
  $type?: 'warning';
  $variant?: 'subtle';
}

export default function Alert({ $type, $variant, ...props }: AlertProps) {
  return (
    <Container
      $enableGutters
      $as="div"
      role="alert"
      aria-busy="false"
      className={cn(alertClasses.root, {
        [alertClasses.typeWarning]: $type === 'warning',
        [alertClasses.variantSubtle]: $variant === 'subtle'
      })}
      {...props}
    />
  );
}
