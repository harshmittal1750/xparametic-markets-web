import { ReactNode } from 'react';

import useAlertNotification from 'hooks/useAlertNotification';

import BetaWarning from '../BetaWarning';
import Footer from '../Footer';
import NavBar from '../NavBar';
import RightSidebar from '../RightSidebar';
import ScrollableArea from '../ScrollableArea';
import Sidebar from '../Sidebar';

type LayoutProps = {
  children: ReactNode;
};

function Layout({ children }: LayoutProps) {
  // Hooks
  const { alertList } = useAlertNotification();

  // Derivated state
  const hasAlertNotification = alertList.size > 0;

  return (
    <>
      <BetaWarning />
      <div className="pm-l-layout">
        <header className="pm-l-layout__header sticky">
          <div id="alert-notification-portal" className="pm-l-layout__alert" />
          <NavBar />
        </header>
        <nav className="pm-l-layout__nav">
          <Sidebar />
        </nav>
        <ScrollableArea
          className={`${
            hasAlertNotification
              ? 'pm-l-layout__scrollable-area--with-alert'
              : 'pm-l-layout__scrollable-area'
          } flex-column justify-space-between`}
        >
          <main className="pm-l-layout__main">{children}</main>
          <footer className="pm-l-layout__footer">
            <Footer />
          </footer>
        </ScrollableArea>
        <ScrollableArea>
          <aside className="pm-l-layout__aside">
            <RightSidebar hasAlertNotification={hasAlertNotification} />
          </aside>
        </ScrollableArea>
        <div id="toast-notification-portal" />
      </div>
    </>
  );
}

export default Layout;
