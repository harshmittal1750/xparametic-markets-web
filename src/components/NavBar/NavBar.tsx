import { Link } from 'react-router-dom';

import { PolkamarketsLogo } from 'assets/icons';

import NavBarActions from './NavBarActions';
import NavBarLinks from './NavBarLinks';

export default function NavBar() {
  return (
    <div className="pm-l-navbar">
      <Link to="/" aria-label="Homepage" className="pm-l-navbar__logos">
        <PolkamarketsLogo />
      </Link>
      <NavBarLinks />
      <NavBarActions />
    </div>
  );
}

NavBar.displayName = 'NavBar';
