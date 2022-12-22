import { useCallback, useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import type ReactRouterDom from 'react-router-dom';

import { useMedia } from 'ui';

import { IlluminateFantasyLeagueLogo } from 'assets/icons';

import { Button } from 'components/Button';
import CreateMarket from 'components/CreateMarket';
import Feature from 'components/Feature';
import Icon from 'components/Icon';
import Modal from 'components/Modal';
import Text from 'components/Text';

import HeaderNavClasses from './HeaderNav.module.scss';

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

function HeaderNavModal({
  children
}: {
  children: ((arg: () => void) => React.ReactNode) | React.ReactNode;
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
        className={{
          dialog: HeaderNavClasses.dialog
        }}
      >
        <header className={HeaderNavClasses.header}>
          <Button
            size="xs"
            variant="ghost"
            onClick={handleHide}
            className={HeaderNavClasses.hide}
          >
            <Icon name="Cross" size="lg" />
          </Button>
        </header>
        {typeof children === 'function' ? children(handleHide) : children}
        <footer className={HeaderNavClasses.footer}>
          <Text
            color="gray"
            scale="tiny-uppercase"
            fontWeight="bold"
            className={HeaderNavClasses.title}
          >
            Join our community
          </Text>
          <ul className={HeaderNavClasses.socials}>
            {socials.map(social => (
              <li key={social.name}>
                <Text
                  // @ts-ignore
                  as="a"
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={HeaderNavClasses.social}
                >
                  <Icon
                    title={social.name}
                    name={social.name}
                    className={HeaderNavClasses.icon}
                  />
                </Text>
              </li>
            ))}
          </ul>
          <Feature name="regular">
            <CreateMarket
              fullwidth
              className={HeaderNavClasses.createMarket}
              onCreateClick={handleHide}
            />
          </Feature>
        </footer>
      </Modal>
    </>
  );
}
function HeaderNavMenu({
  NavLinkProps
}: {
  NavLinkProps?: Omit<ReactRouterDom.NavLinkProps, 'to'>;
}) {
  return (
    <ul className={HeaderNavClasses.list}>
      {pathnames.map(_pathname => {
        const pathname = `/${
          _pathname === marketsPathname ? '' : _pathname.toLowerCase()
        }`;

        return (
          <li key={_pathname} className={HeaderNavClasses.item}>
            <NavLink
              to={pathname}
              className={HeaderNavClasses.link}
              activeClassName={HeaderNavClasses.active}
              isActive={(_, location) => location.pathname === pathname}
              {...NavLinkProps}
            >
              {_pathname}
            </NavLink>
          </li>
        );
      })}
    </ul>
  );
}
function HeaderNavMenuModal() {
  return (
    <HeaderNavModal>
      {handleHide => <HeaderNavMenu NavLinkProps={{ onClick: handleHide }} />}
    </HeaderNavModal>
  );
}
export default function HeaderNav() {
  const isTv = useMedia('(min-width: 1440px)');
  const isDesktop = useMedia('(min-width: 1024px)');

  return (
    <nav className={HeaderNavClasses.root}>
      {isDesktop && !isTv && <HeaderNavMenuModal />}
      <Link to="/" aria-label="Homepage" className={HeaderNavClasses.logos}>
        <IlluminateFantasyLeagueLogo />
      </Link>
      {isTv ? <HeaderNavMenu /> : !isDesktop && <HeaderNavMenuModal />}
    </nav>
  );
}
