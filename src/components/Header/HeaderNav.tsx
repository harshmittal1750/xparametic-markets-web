import { Fragment, useCallback, useState } from 'react';
import { NavLink, Link } from 'react-router-dom';

import { IlluminateFantasyLeagueLogo } from 'assets/icons';

import { Button } from 'components/Button';
import Icon from 'components/Icon';
import Modal from 'components/Modal';

import HeaderClasses from './Header.module.scss';

const marketsPathname = 'Markets';
const pathnames = [
  marketsPathname,
  'Portfolio',
  'Achievements',
  'Leaderboard',
  'Clubs'
];

function HeaderNavMenu({
  children
}: {
  children(arg: () => void): React.ReactNode;
}) {
  const [show, setShow] = useState(false);
  const handleHide = useCallback(() => setShow(false), []);

  return (
    <>
      <Button size="xs" variant="ghost" onClick={() => setShow(true)}>
        <Icon name="Menu" />
      </Button>
      <Modal
        show={show}
        fullScreen
        fullWidth
        className={{
          root: HeaderClasses.modal
        }}
      >
        <header className={HeaderClasses.header}>
          <Button
            size="xs"
            variant="ghost"
            onClick={handleHide}
            className={HeaderClasses.hide}
          >
            <Icon name="Cross" />
          </Button>
        </header>
        {children(handleHide)}
      </Modal>
    </>
  );
}
export default function HeaderNav({ isDesktop }: { isDesktop: boolean }) {
  const MenuComponent = isDesktop ? Fragment : HeaderNavMenu;

  return (
    <nav className={HeaderClasses.nav}>
      <Link to="/" aria-label="Homepage" className={HeaderClasses.logos}>
        <IlluminateFantasyLeagueLogo />
      </Link>
      <MenuComponent>
        {handleHide => (
          <ul className={HeaderClasses.list}>
            {pathnames.map(_pathname => {
              const pathname = `/${
                _pathname === marketsPathname ? '' : _pathname.toLowerCase()
              }`;

              return (
                <li key={_pathname} className={HeaderClasses.item}>
                  <NavLink
                    to={pathname}
                    className={HeaderClasses.link}
                    activeClassName={HeaderClasses.active}
                    isActive={(_, location) => location.pathname === pathname}
                    onClick={handleHide}
                  >
                    {_pathname}
                  </NavLink>
                </li>
              );
            })}
          </ul>
        )}
      </MenuComponent>
    </nav>
  );
}
