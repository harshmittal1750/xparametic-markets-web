import { Container } from 'ui';

import bodyGradientDark from 'assets/images/body-gradient--dark.jpg';
import bodyGradient from 'assets/images/body-gradient.jpg';

import { useTheme } from 'hooks';

import BetaWarning from '../BetaWarning';
import Footer from '../Footer';
import Header from '../Header';
import RightSidebar from '../RightSidebar';
import ScrollableArea from '../ScrollableArea';

export default function Layout({ children }: React.PropsWithChildren<{}>) {
  const theme = useTheme();

  return (
    <div className="pm-l-layout">
      <div
        className="pm-l-layout__body-gradient"
        style={
          {
            '--image': `url(${
              theme.theme === 'dark' ? bodyGradientDark : bodyGradient
            })`
          } as React.CSSProperties
        }
      />
      <BetaWarning />
      <Header />
      <ScrollableArea className="pm-l-layout__scrollable-area">
        <Container className="pm-l-layout__main">
          {children}
          <footer className="pm-l-layout__footer">
            <Footer />
          </footer>
        </Container>
      </ScrollableArea>
      <RightSidebar />
      <div id="toast-notification-portal" />
    </div>
  );
}
