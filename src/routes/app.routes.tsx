import { useEffect, useState, Suspense, lazy } from 'react';
import { Switch, Route } from 'react-router-dom';

import { getUserCountry } from 'helpers/location';
import isEmpty from 'lodash/isEmpty';
import isUndefined from 'lodash/isUndefined';
import { fetchAditionalData } from 'redux/ducks/bepro';
import store from 'redux/store';

import { Layout } from 'components';

import { useAppSelector, useNetwork } from 'hooks';

const Home = lazy(() => import('pages/Home'));
const Market = lazy(() => import('pages/Market'));
const Portfolio = lazy(() => import('pages/Portfolio'));
const WrongNetwork = lazy(() => import('pages/WrongNetwork'));
const CreateMarket = lazy(() => import('pages/CreateMarket'));
const RestrictedCountry = lazy(() => import('pages/RestrictedCountry'));

const { REACT_APP_NETWORK_ID, REACT_APP_RESTRICTED_COUNTRIES } = process.env;

const AppRoutes = () => {
  const walletConnected = useAppSelector(state => state.bepro.isLoggedIn);
  const network = useNetwork();

  const isAllowedNetwork =
    !walletConnected || network?.id === REACT_APP_NETWORK_ID;

  const restrictedCountries = REACT_APP_RESTRICTED_COUNTRIES?.split(',');
  const [isAllowedCountry, setIsAllowedCountry] = useState(true);

  useEffect(() => {
    if (isAllowedNetwork && walletConnected) {
      fetchAditionalData(store.dispatch);
    }
  }, [isAllowedNetwork, walletConnected]);

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
  }, [restrictedCountries]);

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
        </Switch>
      </Suspense>
    </Layout>
  );
};

export default AppRoutes;
