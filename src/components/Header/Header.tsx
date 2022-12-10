import classNames from 'classnames';
import { Container, useMedia } from 'ui';

import NavbarClasses from './Header.module.scss';
import HeaderActions from './HeaderActions';
import HeaderNav from './HeaderNav';

export default function NavBar() {
  const isDesktop = useMedia('(min-width: 1024px)');

  return (
    <Container
      as="header"
      className={classNames(NavbarClasses.root, NavbarClasses.container)}
    >
      <HeaderNav isDesktop={isDesktop} />
      <HeaderActions isDesktop={isDesktop} />
    </Container>
  );
}

NavBar.displayName = 'NavBar';
