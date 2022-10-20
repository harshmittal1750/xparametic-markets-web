import NavBarActions from './NavBarActions';
import NavBarLinks from './NavBarLinks';

export default function NavBar() {
  return (
    <div className="pm-l-navbar">
      <NavBarLinks />
      <NavBarActions />
    </div>
  );
}

NavBar.displayName = 'NavBar';
