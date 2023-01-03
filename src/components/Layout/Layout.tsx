import { useEffect, useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { routes } from 'config';
import { login } from 'redux/ducks/polkamarkets';

import BetaWarning from 'components/BetaWarning';
import Footer from 'components/Footer';
import Header from 'components/Header';
import RestrictedCountry from 'components/RestrictedCountry';
import SEO from 'components/SEO';
import WrongNetwork from 'components/WrongNetwork';

import { useTheme, useAppDispatch, useNetwork } from 'hooks';

export default function Layout({ children }: React.PropsWithChildren<{}>) {
  const location = useLocation();
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const { networkConfig } = useNetwork();

  if (theme.theme === 'dark') {
    document.documentElement.classList.add('theme--dark');
  } else document.documentElement.classList.remove('theme--dark');

  useLayoutEffect(() => {
    window.scrollTo({ left: 0, top: 0, behavior: 'smooth' });
  }, [location.pathname]);
  useEffect(() => {
    dispatch(login(networkConfig));
  }, [dispatch, networkConfig]);

  return (
    <>
      <RestrictedCountry />
      <WrongNetwork />
      <BetaWarning />
      <SEO
        title="Illuminate Fantasy League, Powered By Polkamarkets"
        description="The Illuminate Fantasy League is a prediction marketplace powered by Polkamarkets, made to celebrate the Football World Cup 2022 with the Moonbeam Community. Join now, bring your friends and start placing your World Cup Predictions for every tournament match to win the IFC title!"
        imageUrl={`${process.env.PUBLIC_URL}/ifl_meta.jpg`}
      />
      <Header />
      {children}
      {location.pathname !== routes.home.pathname && <Footer />}
      <div id="toast-notification-portal" />
    </>
  );
}
