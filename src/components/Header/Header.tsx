import cn from 'classnames';
import { Container } from 'ui';

import NavbarClasses from './Header.module.scss';
import HeaderActions from './HeaderActions';
import HeaderNav from './HeaderNav';

export default function Header() {
  return (
    <Container
      as="header"
      className={cn(NavbarClasses.root, NavbarClasses.container)}
    >
      <HeaderNav />
      <HeaderActions />
    </Container>
  );
}

Header.displayName = 'Header';
