import { useEffect, useState, Suspense, lazy } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import { environment } from 'config';
import { getUserCountry } from 'helpers/location';
import isEmpty from 'lodash/isEmpty';
import isUndefined from 'lodash/isUndefined';
import { fetchAditionalData } from 'redux/ducks/polkamarkets';

import { Layout } from 'components';

import {
  useAppDispatch,
  useAppSelector,
  useNetwork,
  usePolkamarketsService
} from 'hooks';

const Home = lazy(() => import('pages/Home'));
const Market = lazy(() => import('pages/Market'));
const Portfolio = lazy(() => import('pages/Portfolio'));
const WrongNetwork = lazy(() => import('pages/WrongNetwork'));
const CreateMarket = lazy(() => import('pages/CreateMarket'));
const RestrictedCountry = lazy(() => import('pages/RestrictedCountry'));
const Achievements = lazy(() => import('pages/Achievements'));
const Leaderboard = lazy(() => import('pages/Leaderboard'));
const Clubs = lazy(() => import('pages/Clubs'));
const Profile = lazy(() => import('pages/Profile'));

const { REACT_APP_RESTRICTED_COUNTRIES } = process.env;
const restrictedCountries = REACT_APP_RESTRICTED_COUNTRIES?.split(',');

const AppRoutes = () => {
  const dispatch = useAppDispatch();
  const walletConnected = useAppSelector(
    state => state.polkamarkets.isLoggedIn
  );

  const { network, networkConfig } = useNetwork();
  const polkamarketsService = usePolkamarketsService();

  const isAllowedNetwork =
    !walletConnected || Object.keys(environment.NETWORKS).includes(network.id);

  const [isAllowedCountry, setIsAllowedCountry] = useState(true);

  useEffect(() => {
    if (isAllowedNetwork && walletConnected) {
      dispatch(fetchAditionalData(polkamarketsService));
    }
  }, [
    dispatch,
    isAllowedNetwork,
    networkConfig,
    polkamarketsService,
    walletConnected
  ]);

  useEffect(() => {
    async function fetchUserCountry() {
      if (!isUndefined(restrictedCountries) && !isEmpty(restrictedCountries)) {
        const userCountry = await getUserCountry();

        setIsAllowedCountry(
          !restrictedCountries.includes(userCountry.countryCode)
        );
      }
    }
    fetchUserCountry();
  }, []);

  if (!isAllowedCountry)
    return (
      <Suspense fallback={null}>
        <RestrictedCountry />
      </Suspense>
    );

  if (!isAllowedNetwork)
    return (
      <Suspense fallback={null}>
        <WrongNetwork />
      </Suspense>
    );

  return (
    <Layout>
      <Suspense fallback={null}>
        <Switch>
          <Route component={Home} exact path="/" />
          <Route component={Market} path="/markets" />
          <Route component={Portfolio} path="/portfolio" />
          <Route component={CreateMarket} path="/market/create" />
          <Route component={Achievements} path="/achievements" />
          <Route component={Leaderboard} exact path="/leaderboard" />
          <Route component={Clubs} exact path="/clubs" />
          <Route component={Leaderboard} path="/clubs/:slug" />
          <Redirect from="/leaderboard/:slug" to="/clubs/:slug" />
          <Route component={Profile} path="/user/:address" />
        </Switch>
      </Suspense>
    </Layout>
  );
};

export default AppRoutes;
