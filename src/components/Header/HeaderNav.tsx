import { useCallback, useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import type ReactRouterDom from 'react-router-dom';

import { pages, socials } from 'config';
import { shiftSlash } from 'helpers/string';
import { useMedia } from 'ui';

import { PolkamarketsLogo } from 'assets/icons';

import { Button } from 'components/Button';
import CreateMarket from 'components/CreateMarket';
import Feature from 'components/Feature';
import Icon from 'components/Icon';
import Modal from 'components/Modal';
import NetworkSelector from 'components/NetworkSelector';
import Text from 'components/Text';

import headerNavClasses from './HeaderNav.module.scss';

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
          dialog: headerNavClasses.dialog
        }}
      >
        <header className={headerNavClasses.header}>
          <Button
            size="xs"
            variant="ghost"
            onClick={handleHide}
            className={headerNavClasses.hide}
          >
            <Icon name="Cross" size="lg" />
          </Button>
        </header>
        {typeof children === 'function' ? children(handleHide) : children}
        <footer className={headerNavClasses.footer}>
          <Text
            color="gray"
            scale="tiny-uppercase"
            fontWeight="bold"
            className={headerNavClasses.title}
          >
            Join our community
          </Text>
          <ul className={headerNavClasses.socials}>
            {Object.values(socials).map(social => (
              <li key={social.name}>
                <Text
                  // @ts-ignore
                  as="a"
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={headerNavClasses.social}
                >
                  <Icon
                    title={social.name}
                    name={social.name}
                    className={headerNavClasses.icon}
                  />
                </Text>
              </li>
            ))}
          </ul>
          <Feature name="regular">
            <CreateMarket
              fullwidth
              className={headerNavClasses.createMarket}
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
    <ul className={headerNavClasses.list}>
      {Object.values(pages)
        .filter(page => page.enabled && page.navigation)
        .reverse()
        .map(page => (
          <li key={page.name} className={headerNavClasses.item}>
            <NavLink
              to={page.pathname}
              className={headerNavClasses.link}
              activeClassName={headerNavClasses.active}
              isActive={(_, location) => {
                if (
                  location.pathname === pages.home.pathname ||
                  /^\/markets/.test(location.pathname)
                ) {
                  return page.pathname === pages.home.pathname;
                }

                if (pages.clubs.enabled && /^\/clubs/.test(location.pathname)) {
                  return page.pathname === pages.clubs.pathname;
                }

                return new RegExp(shiftSlash(location.pathname)).test(
                  shiftSlash(page.pathname)
                );
              }}
              {...NavLinkProps}
            >
              {page.name}
            </NavLink>
          </li>
        ))}
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
    <nav className={headerNavClasses.root}>
      {isDesktop && !isTv && <HeaderNavMenuModal />}
      <Link to="/" aria-label="Homepage" className={headerNavClasses.logos}>
        <PolkamarketsLogo />
      </Link>
      {isTv ? (
        <HeaderNavMenu />
      ) : (
        !isDesktop && (
          <>
            <NetworkSelector responsive className={headerNavClasses.network} />
            <HeaderNavMenuModal />
          </>
        )
      )}
    </nav>
  );
}
