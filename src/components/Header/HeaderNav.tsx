import { Fragment, useState } from 'react';
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

function HeaderNavMenu({ children }: React.PropsWithChildren<{}>) {
  const [show, setShow] = useState(false);

  return (
    <>
      <Button size="xs" variant="ghost" onClick={() => setShow(true)}>
        <Icon name="Menu" />
      </Button>
      <Modal show={show} onHide={() => setShow(false)}>
        {children}
      </Modal>
    </>
  );
}
export default function HeaderNav({ isDesktop }: { isDesktop: boolean }) {
  const HeaderNavWrapper = isDesktop ? Fragment : HeaderNavMenu;

  return (
    <nav className={HeaderClasses.nav}>
      <Link to="/" aria-label="Homepage" className={HeaderClasses.logos}>
        <IlluminateFantasyLeagueLogo />
      </Link>
      <HeaderNavWrapper>
        <ul>
          {pathnames.map(_pathname => {
            const pathname = `/${
              _pathname === marketsPathname ? '' : _pathname.toLowerCase()
            }`;

            return (
              <li key={_pathname}>
                <NavLink
                  to={pathname}
                  className="pm-l-layout__header__nav-link"
                  activeClassName="active"
                  isActive={(_, location) => location.pathname === pathname}
                >
                  {_pathname}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </HeaderNavWrapper>
    </nav>
  );
}
