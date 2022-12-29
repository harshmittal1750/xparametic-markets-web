import { useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { usePrevious, useTheme } from 'hooks';

import BetaWarning from '../BetaWarning';
import Footer from '../Footer';
import Header from '../Header';
import RightSidebar from '../RightSidebar';

export default function Layout({ children }: React.PropsWithChildren<{}>) {
  const { pathname } = useLocation();
  const { theme } = useTheme();
  const themeCn = `theme--${theme}`;
  const { current: themeCnPrev } = usePrevious(themeCn);

  if (themeCnPrev && themeCn !== themeCnPrev)
    document.documentElement.classList.replace(themeCnPrev, themeCn);
  else document.documentElement.classList.add(themeCn);

  useLayoutEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, [pathname]);

  return (
    <>
      <BetaWarning />
      <Header />
      {children}
      {pathname !== '/' && <Footer />}
      <RightSidebar />
      <div id="toast-notification-portal" />
    </>
  );
}
