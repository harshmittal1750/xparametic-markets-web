import cn from 'classnames';
import { Container, useMedia } from 'ui';

import NavBarClasses from './NavBar.module.scss';
import NavBarActionsInfo from './NavBarActionsInfo';
import NavBarActionsNetwork from './NavBarActionsNetwork';
import NavBarActionsTheme from './NavBarActionsTheme';
import NavMenu from './NavMenu';

export default function NavBar() {
  const isDesktop = useMedia('(min-width: 1024px)');

  return (
    <Container as="header" className="pm-l-layout__header">
      <NavMenu isDesktop={isDesktop} />
      <div
        className={cn('pm-l-layout__header__actions', NavBarClasses.actions)}
      >
        <>
          <NavBarActionsInfo />
          <NavBarActionsNetwork />
        </>
        <NavBarActionsTheme />
      </div>
    </Container>
  );
}

NavBar.displayName = 'NavBar';
