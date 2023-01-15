import { useEffect } from 'react';
import { matchPath, useLocation } from 'react-router-dom';

import cn from 'classnames';
import { pages } from 'config';
import { login } from 'redux/ducks/polkamarkets';

import BetaWarning from 'components/BetaWarning';
import Footer from 'components/Footer';
import Header from 'components/Header';
import SEO from 'components/SEO';
import WrongNetwork from 'components/WrongNetwork';

import { useTheme, useAppDispatch, useNetwork } from 'hooks';

export default function Layout({ children }: React.PropsWithChildren<{}>) {
  const location = useLocation();
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const network = useNetwork();
  const page = Object.values(pages).filter(
    ({ pathname }) => pathname === location.pathname
  )[0];
  const isHomePathname =
    location.pathname === pages.home.pathname ||
    matchPath(location.pathname, {
      path: pages.home.pages.market.pathname
    });

  if (theme.theme === 'dark') {
    document.documentElement.classList.add('theme--dark');
    document.documentElement.classList.remove('theme--light');
  } else {
    document.documentElement.classList.add('theme--light');
    document.documentElement.classList.remove('theme--dark');
  }

  useEffect(() => {
    window.scrollTo({ left: 0, top: 0, behavior: 'smooth' });
  }, [location.pathname]);
  useEffect(() => {
    dispatch(login(network.networkConfig));
  }, [dispatch, network.networkConfig]);

  return (
    <>
      <WrongNetwork />
      <BetaWarning />
      {page?.meta && <SEO {...page.meta} />}
      <Header
        className={cn({
          'margin-bottom:24@desktop': !isHomePathname
        })}
      />
      {children}
      <Footer
        className={cn({
          'padding-top:12 padding-top:24@desktop': !isHomePathname
        })}
      />
      <div id="toast-notification-portal" />
    </>
  );
}
