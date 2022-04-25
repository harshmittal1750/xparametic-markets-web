import { ReactNode } from 'react';

import { useCookie } from 'hooks';
import useAlertNotification from 'hooks/useAlertNotification';

import BetaWarning from '../BetaWarning';
import Footer from '../Footer';
import Modal from '../Modal';
import NavBar from '../NavBar';
import RightSidebar from '../RightSidebar';
import ScrollableArea from '../ScrollableArea';
import Sidebar from '../Sidebar';

type LayoutProps = {
  children: ReactNode;
};

function Layout({ children }: LayoutProps) {
  const { alertList } = useAlertNotification();

  const [modalCookie, setModalCookie] = useCookie('modalVisible', 'true');
  const modalVisible = modalCookie === 'true';

  const hasAlertNotification = alertList.size > 0;

  return (
    <>
      {modalVisible ? (
        <Modal>
          <BetaWarning handleChangeModalVisibility={setModalCookie} />
        </Modal>
      ) : null}
      <div className="pm-l-layout">
        <header className="pm-l-layout__header sticky">
          <div id="alert-notification-portal" />
          <NavBar />
        </header>
        <nav className="pm-l-layout__nav">
          <Sidebar />
        </nav>
        <ScrollableArea
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: hasAlertNotification
              ? 'calc(100vh - 11rem)'
              : 'calc(100vh - 7.3rem)'
          }}
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
