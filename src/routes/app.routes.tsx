import { Suspense, useEffect, useState } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import { environment, pages, ui } from 'config';
import { getUserCountry } from 'helpers/location';
import isEmpty from 'lodash/isEmpty';
import isUndefined from 'lodash/isUndefined';
import { Spinner } from 'ui';

import RestrictedCountry from 'pages/RestrictedCountry';
import WrongNetwork from 'pages/WrongNetwork';

import { Layout } from 'components';

import { useAppSelector, useNetwork } from 'hooks';

const restrictedCountries =
  process.env.REACT_APP_RESTRICTED_COUNTRIES?.split(',');

function AppRoutes() {
  const { network } = useNetwork();

  const walletConnected = useAppSelector(
    state => state.polkamarkets.isLoggedIn
  );

  const [isLoading, setLoading] = useState(false);
  const [isAllowedCountry, setIsAllowedCountry] = useState(true);

  const isAllowedNetwork =
    !walletConnected || Object.keys(environment.NETWORKS).includes(network.id);

  useEffect(() => {
    async function fetchUserCountry() {
      if (!isUndefined(restrictedCountries) && !isEmpty(restrictedCountries)) {
        setLoading(true);
        const userCountry = await getUserCountry();

        setLoading(false);
        setIsAllowedCountry(
          !restrictedCountries.includes(userCountry.countryCode)
        );
      }
    }
    fetchUserCountry();
  }, []);

  if (isLoading) return <Spinner />;

  if (!isAllowedCountry) return <RestrictedCountry />;

  if (!isAllowedNetwork) return <WrongNetwork />;

  return (
    <Layout>
      <Suspense fallback={<Spinner />}>
        <Switch>
          {Object.values(pages)
            .filter(page => page.enabled)
            .map(page => (
              <Route
                key={page.name}
                exact={page.exact}
                path={page.pathname}
                component={page.Component}
              />
            ))}
          {ui.clubs.enabled && (
            <Redirect from="/leaderboard/:slug" to="/clubs/:slug" />
          )}
        </Switch>
      </Suspense>
    </Layout>
  );
}

export default AppRoutes;
