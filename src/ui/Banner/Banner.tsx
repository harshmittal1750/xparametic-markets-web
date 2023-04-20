import cn from 'classnames';
import Adornment from 'ui/Adornment';
import type { ContainerProps } from 'ui/Container';
import Container from 'ui/Container';
import { useTheme } from 'ui/useTheme';

import Icon from 'components/Icon';
import Text from 'components/Text';

import bannerClasses from './Banner.module.scss';

interface BannerProps
  extends Pick<ContainerProps<'div'>, 'children' | 'className'> {
  $type?: 'warning';
  $variant?: 'subtle';
  actions?: React.ReactNode;
}

const icons = {
  warning: 'Warning'
} as const;

export default function Banner({
  $type,
  $variant,
  className,
  children,
  actions,
  ...props
}: BannerProps) {
  const theme = useTheme();

  return (
    <Container
      $as="div"
      $enableGutters={!theme.device.isDesktop}
      role="banner"
      aria-busy="false"
      className={cn(
        bannerClasses.root,
        {
          [bannerClasses.typeWarning]: $type === 'warning',
          [bannerClasses.variantSubtle]: $variant === 'subtle'
        },
        className
      )}
      {...props}
    >
      <div className={bannerClasses.container}>
        <Adornment $size={theme.device.isDesktop ? 'md' : 'sm'} $edge="start">
          {$type && <Icon name={icons[$type]} />}
        </Adornment>
        <Text fontWeight="medium" scale="caption">
          {children}
        </Text>
      </div>
      <div className={bannerClasses.actions}>{actions}</div>
    </Container>
  );
}
