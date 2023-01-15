import cn from 'classnames';
import { Container } from 'ui';
import type { ContainerProps } from 'ui/Container/Container';

import NavbarClasses from './Header.module.scss';
import HeaderActions from './HeaderActions';
import HeaderNav from './HeaderNav';

export type HeaderProps = Pick<ContainerProps<'header'>, 'className'>;

export default function Header({ className }: HeaderProps) {
  return (
    <Container
      $as="header"
      className={cn(NavbarClasses.root, NavbarClasses.container, className)}
    >
      <HeaderNav />
      <HeaderActions />
    </Container>
  );
}

Header.displayName = 'Header';
