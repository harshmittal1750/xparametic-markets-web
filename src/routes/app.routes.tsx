import { useEffect, useState, Suspense, lazy } from 'react';
import { Switch, Route } from 'react-router-dom';

import { environment } from 'config';
import { getUserCountry } from 'helpers/location';
import isEmpty from 'lodash/isEmpty';
import isUndefined from 'lodash/isUndefined';
import { fetchAditionalData } from 'redux/ducks/polkamarkets';

import { Layout } from 'components';

import { useAppDispatch, useAppSelector, useNetwork } from 'hooks';

const Home = lazy(() => import('pages/Home'));
const Market = lazy(() => import('pages/Market'));
const Portfolio = lazy(() => import('pages/Portfolio'));
const WrongNetwork = lazy(() => import('pages/WrongNetwork'));
const CreateMarket = lazy(() => import('pages/CreateMarket'));
const RestrictedCountry = lazy(() => import('pages/RestrictedCountry'));
const Achievements = lazy(() => import('pages/Achievements'));
const Leaderboard = lazy(() => import('pages/Leaderboard'));
const Profile = lazy(() => import('pages/Profile'));
const restrictedCountries =
  process.env.REACT_APP_RESTRICTED_COUNTRIES?.split(',');

const AppRoutes = () => {
  const [isCountryAllowed, setIsCountryAllowed] = useState(true);
  const dispatch = useAppDispatch();
  const isWalletConnected = useAppSelector(
    state => state.polkamarkets.isLoggedIn
  );
  const { network, networkConfig } = useNetwork();
  const isNetworkAllowed =
    !isWalletConnected ||
    Object.keys(environment.NETWORKS).includes(network.id);
  const renderNetworkAllowed = !isNetworkAllowed ? (
    <WrongNetwork />
  ) : (
    <Switch>
      <Route component={Home} exact path="/" />
      <Route component={Market} path="/markets" />
      <Route component={Portfolio} path="/portfolio" />
      <Route component={CreateMarket} path="/market/create" />
      <Route component={Achievements} path="/achievements" />
      <Route component={Leaderboard} path="/leaderboard" />
      <Route component={Profile} path="/user/:address" />
    </Switch>
  );

  useEffect(() => {
    if (isNetworkAllowed && isWalletConnected) {
      dispatch(fetchAditionalData(networkConfig));
    }
  }, [dispatch, isNetworkAllowed, networkConfig, isWalletConnected]);

  useEffect(() => {
    (async function handleUserCountry() {
      if (!isUndefined(restrictedCountries) && !isEmpty(restrictedCountries)) {
        const userCountry = await getUserCountry();

        setIsCountryAllowed(
          !restrictedCountries.includes(userCountry.countryCode)
        );
      }
    })();
  }, []);

  return (
    <Layout>
      <Suspense fallback={null}>
        {!isCountryAllowed ? <RestrictedCountry /> : renderNetworkAllowed}
      </Suspense>
    </Layout>
  );
};

export default AppRoutes;
