import { Fragment, useState } from 'react';
import { NavLink, Link } from 'react-router-dom';

import { IlluminateFantasyLeagueLogo } from 'assets/icons';

import { Button } from 'components/Button';
import Icon from 'components/Icon';
import Modal from 'components/Modal';

const marketsPathname = 'Markets';
const pathnames = [
  marketsPathname,
  'Portfolio',
  'Achievements',
  'Leaderboard',
  'Clubs'
];

function NavMenuLinks({ children }: React.PropsWithChildren<{}>) {
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
export default function NavMenu({ isDesktop }: { isDesktop: boolean }) {
  const NavMenuWrapper = isDesktop ? Fragment : NavMenuLinks;

  return (
    <nav className="pm-l-layout__header__nav">
      <Link to="/" aria-label="Homepage" className="pm-l-layout__header__logos">
        <IlluminateFantasyLeagueLogo />
      </Link>
      <NavMenuWrapper>
        <ul>
          {pathnames.map(_pathname => {
            const pathname = `/${
              _pathname === marketsPathname ? '' : _pathname.toLowerCase()
            }`;

            return (
              <NavLink
                key={_pathname}
                to={pathname}
                className="pm-l-layout__header__nav-link"
                activeClassName="active"
                isActive={(_, location) => location.pathname === pathname}
              >
                {_pathname}
              </NavLink>
            );
          })}
        </ul>
      </NavMenuWrapper>
    </nav>
  );
}
