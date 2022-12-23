import { Container } from 'ui';

import { usePrevious, useTheme } from 'hooks';

import BetaWarning from '../BetaWarning';
import Footer from '../Footer';
import Header from '../Header';
import RightSidebar from '../RightSidebar';

export default function Layout({ children }: React.PropsWithChildren<{}>) {
  const { theme } = useTheme();
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
      <Container className="pm-l-layout__main">
        {children}
        <footer className="pm-l-layout__footer">
          <Footer />
        </footer>
      </Container>
      <RightSidebar />
      <div id="toast-notification-portal" />
    </>
  );
}
