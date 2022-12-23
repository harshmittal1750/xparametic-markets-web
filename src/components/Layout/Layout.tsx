import { Container, useRect } from 'ui';

import { useFooterVisibility, usePrevious, useTheme } from 'hooks';

import BetaWarning from '../BetaWarning';
import Footer from '../Footer';
import Header from '../Header';
import RightSidebar from '../RightSidebar';

export default function Layout({ children }: React.PropsWithChildren<{}>) {
  const [ref, rect] = useRect();
  const { theme } = useTheme();
  const footerVisibility = useFooterVisibility();
  const themeCn = `theme--${theme}`;
  const { current: themeCnPrev } = usePrevious(themeCn);

  document.documentElement.dataset.theme = theme;
  if (themeCnPrev && themeCn !== themeCnPrev)
    document.documentElement.classList.replace(themeCnPrev, themeCn);
  else document.documentElement.classList.add(themeCn);

  return (
    <>
      <BetaWarning />
      <Header />
      <Container
        ref={ref}
        style={{
          height: `${window.innerHeight - rect?.top}px`
        }}
        className="pm-l-layout__main"
      >
        {children}
      </Container>
      {footerVisibility.visible && <Footer />}
      <RightSidebar />
      <div id="toast-notification-portal" />
    </>
  );
}
