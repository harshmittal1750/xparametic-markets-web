import { Fragment, useCallback, useState } from 'react';
import { NavLink, Link } from 'react-router-dom';

import { useMedia } from 'ui';

import { IlluminateFantasyLeagueLogo } from 'assets/icons';

import { Button } from 'components/Button';
import CreateMarket from 'components/CreateMarket';
import Icon from 'components/Icon';
import Modal from 'components/Modal';
import Text from 'components/Text';

import HeaderClasses from './Header.module.scss';

const marketsPathname = 'Markets';
const pathnames = [
  marketsPathname,
  'Portfolio',
  'Achievements',
  'Leaderboard',
  'Clubs'
];
const socials = [
  {
    name: 'Twitter',
    href: 'https://twitter.com/polkamarkets'
  },
  {
    name: 'Medium',
    href: 'https://blog.polkamarkets.com/'
  },
  {
    name: 'Telegram',
    href: 'https://t.me/polkamarkets_announcements'
  },
  {
    name: 'Youtube',
    href: 'https://www.youtube.com/channel/UCKAefRG1MgYMnBmgRYhisTQ'
  },
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/company/polkamarkets'
  },
  {
    name: 'GitHub',
    href: 'https://github.com/Polkamarkets'
  }
] as const;

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
        <Icon name="Menu" size="lg" />
      </Button>
      <Modal
        show={show}
        fullScreen
        fullWidth
        backdrop
        className={{
          dialog: HeaderClasses.dialog
        }}
      >
        <header className={HeaderClasses.header}>
          <Button
            size="xs"
            variant="ghost"
            onClick={handleHide}
            className={HeaderClasses.hide}
          >
            <Icon name="Cross" size="lg" />
          </Button>
        </header>
        {children(handleHide)}
        <footer className={HeaderClasses.footer}>
          <Text
            color="gray"
            scale="tiny-uppercase"
            fontWeight="bold"
            className={HeaderClasses.title}
          >
            Join our community
          </Text>
          <ul className={HeaderClasses.socials}>
            {socials.map(social => (
              <li key={social.name}>
                <Text
                  // @ts-ignore
                  as="a"
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  color="gray"
                  className={HeaderClasses.social}
                >
                  <Icon
                    title={social.name}
                    name={social.name}
                    className={HeaderClasses.icon}
                  />
                </Text>
              </li>
            ))}
          </ul>
          <CreateMarket fullwidth className={HeaderClasses.createMarket} />
        </footer>
      </Modal>
    </>
  );
}
export default function HeaderNav() {
  const isDesktop = useMedia('(min-width: 1024px)');
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
