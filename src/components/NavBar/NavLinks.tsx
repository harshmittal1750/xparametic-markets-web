import * as RouterDom from 'react-router-dom';

const marketsPathname = 'Markets';
const pathnames = [marketsPathname, 'Portfolio', 'Achievements', 'Leaderboard'];

export default function NavLinks() {
  return (
    <nav className="pm-l-navbar__nav">
      {pathnames.map(_pathname => {
        const pathname = `/${
          _pathname === marketsPathname ? '' : _pathname.toLowerCase()
        }`;

        return (
          <RouterDom.NavLink
            key={_pathname}
            to={pathname}
            className="pm-l-navbar__nav-link"
            activeClassName="active"
            isActive={(_, location) => location.pathname === pathname}
          >
            {_pathname}
          </RouterDom.NavLink>
        );
      })}
    </nav>
  );
}
