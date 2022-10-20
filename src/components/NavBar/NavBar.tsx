import * as RouterDom from 'react-router-dom';

import { PolkamarketsLogo } from 'assets/icons';

import NavBarActions from './NavBarActions';
import NavBarLinks from './NavBarLinks';

export default function NavBar() {
  return (
    <div className="pm-l-navbar">
      <RouterDom.Link
        to="/"
        aria-label="Homepage"
        className="pm-l-navbar__logos"
      >
        <PolkamarketsLogo />
      </RouterDom.Link>
      <NavBarLinks />
      <NavBarActions />
    </div>
  );
}

NavBar.displayName = 'NavBar';
