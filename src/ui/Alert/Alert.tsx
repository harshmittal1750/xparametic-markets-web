import cn from 'classnames';
import Adornment from 'ui/Adornment';
import type { ContainerProps } from 'ui/Container';
import Container from 'ui/Container';
import { useTheme } from 'ui/useTheme';

import { Icon, Text } from 'components';

import alertClasses from './Alert.module.scss';

interface AlertProps
  extends Pick<ContainerProps<'div'>, 'children' | 'className'> {
  $type?: 'warning';
  $variant?: 'subtle';
  actions?: React.ReactNode;
}

const icons = {
  warning: 'Warning'
} as const;

export default function Alert({
  $type,
  $variant,
  className,
  children,
  actions,
  ...props
}: AlertProps) {
  const theme = useTheme();

  return (
    <Container
      $as="div"
      $enableGutters={!theme.device.isDesktop}
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
    >
      <div className={alertClasses.container}>
        <Adornment $size={theme.device.isDesktop ? 'md' : 'sm'} $edge="start">
          {$type && <Icon style={{ flexShrink: 0 }} name={icons[$type]} />}
        </Adornment>
        <Text fontWeight="medium" scale="caption">
          {children}
        </Text>
      </div>
      <div className={alertClasses.actions}>{actions}</div>
    </Container>
  );
}
