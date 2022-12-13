import cn from 'classnames';
import { ContainerClasses } from 'ui';

import NavbarClasses from './Header.module.scss';
import HeaderActions from './HeaderActions';
import HeaderNav from './HeaderNav';

export default function Header() {
  return (
    <header
      className={cn(
        ContainerClasses.root,
        NavbarClasses.root,
        NavbarClasses.container
      )}
    >
      <HeaderNav />
      <HeaderActions />
    </header>
  );
}

Header.displayName = 'Header';
