import { ReactNode, useCallback, useState } from 'react';
import { useLocation } from 'react-router-dom';

import isNull from 'lodash/isNull';

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
  // Hooks
  const { alertList } = useAlertNotification();
  const location = useLocation();

  // Derivated state
  const hasAlertNotification = alertList.size > 0;
  const modalVisibilitySearchParam = new URLSearchParams(location.search).get(
    'm'
  );

  const [modalVisibleParam, setModalVisibleParam] = useState(
    isNull(modalVisibilitySearchParam) ||
      (!isNull(modalVisibilitySearchParam) &&
        modalVisibilitySearchParam !== 'f')
  );
  const [modalVisibleCookie, setModalVisibleCookie] = useCookie(
    'modalVisible',
    'true'
  );

  const changeModalVisibility = useCallback(
    (visible: string) => {
      setModalVisibleParam(visible === 'true');
      setModalVisibleCookie(visible);
    },
    [setModalVisibleCookie]
  );

  const modalVisible =
    modalVisibleParam || (!modalVisibleParam && modalVisibleCookie === 'true');

  return (
    <>
      {modalVisible ? (
        <Modal>
          <BetaWarning handleChangeModalVisibility={changeModalVisibility} />
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
