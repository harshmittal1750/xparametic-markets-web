import { ReactNode } from 'react';

import BetaWarning from '../BetaWarning';
import Footer from '../Footer';
import NavBar from '../NavBar';
import RightSidebar from '../RightSidebar';
import ScrollableArea from '../ScrollableArea';

type LayoutProps = {
  children: ReactNode;
};

function Layout({ children }: LayoutProps) {
  return (
    <>
      <BetaWarning />
      <div className="pm-l-layout">
        <header className="pm-l-layout__header sticky">
          <NavBar />
        </header>
        <ScrollableArea className="pm-l-layout__scrollable-area">
          <main className="pm-l-layout__main">
            {children}
            <footer className="pm-l-layout__footer">
              <Footer />
            </footer>
          </main>
        </ScrollableArea>
        <ScrollableArea>
          <aside className="pm-l-layout__aside">
            <RightSidebar />
          </aside>
        </ScrollableArea>
        <div id="toast-notification-portal" />
      </div>
    </>
  );
}

export default Layout;
