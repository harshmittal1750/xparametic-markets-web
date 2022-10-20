import { Fragment, useCallback } from 'react';
import { Link, NavLink } from 'react-router-dom';

import { HamburguerMenuIcon, PolkamarketsLogo } from 'assets/icons';

import { Button } from 'components/Button';

import { useMedia, usePortal } from 'hooks';

const marketsPathname = 'Markets';
const pathnames = [marketsPathname, 'Portfolio', 'Achievements', 'Leaderboard'];

export default function NavBarLinks() {
  const isMx1024 = useMedia('(max-width: 1024px)');
  const Portal = usePortal({
    root: document.body,
    onEffect() {
      document.body.style.overflow = 'hidden';

      return () => {
        document.body.removeAttribute('style');
      };
    }
  });
  const handleClickMenu = useCallback(() => {
    if (Portal.didMount) Portal.unmount();
    else Portal.mount(true);
  }, [Portal]);
  const Ul = isMx1024 ? Portal : Fragment;

  return (
    <nav>
      {isMx1024 && (
        <Button color="default" size="sm" onClick={handleClickMenu}>
          <HamburguerMenuIcon />
        </Button>
      )}
      <Link to="/" aria-label="Homepage" className="pm-l-navbar__logos">
        <PolkamarketsLogo />
      </Link>
      <Ul>
        <ul className="pm-l-navbar__nav">
          {pathnames.map(_pathname => {
            const pathname = `/${
              _pathname === marketsPathname ? '' : _pathname.toLowerCase()
            }`;

            return (
              <li key={_pathname}>
                <NavLink
                  to={pathname}
                  className="pm-l-navbar__nav-link"
                  activeClassName="active"
                  isActive={(_, location) => location.pathname === pathname}
                >
                  {_pathname}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </Ul>
    </nav>
  );
}
