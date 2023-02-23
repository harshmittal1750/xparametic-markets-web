import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { pages } from 'config';

import BetaWarning from 'components/BetaWarning';
import Footer from 'components/Footer';
import Header from 'components/Header';
import SEO from 'components/SEO';

import { useMarketPath } from 'hooks';

export default function Layout({ children }: React.PropsWithChildren<{}>) {
  const location = useLocation();
  const page = Object.values(pages).filter(
    ({ pathname }) => pathname === location.pathname
  )[0];
  const marketPath = useMarketPath();
  const isHomePathname =
    location.pathname === pages.home.pathname || marketPath;

  useEffect(() => {
    window.scrollTo({ left: 0, top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  return (
    <>
      <BetaWarning />
      {page?.meta && <SEO {...page.meta} />}
      <Header $gutterBottom={!isHomePathname} />
      {children}
      <Footer $gutterTop={!isHomePathname} />
      <div id="toast-notification-portal" />
    </>
  );
}
