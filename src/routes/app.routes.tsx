import { Suspense, useEffect, useState } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import { environment, pages } from 'config';
import { getUserCountry } from 'helpers/location';
import isEmpty from 'lodash/isEmpty';
import isUndefined from 'lodash/isUndefined';

import RestrictedCountry from 'pages/RestrictedCountry';
import WrongNetwork from 'pages/WrongNetwork';

import { Layout } from 'components';

import { useAppSelector, useNetwork, useTheme } from 'hooks';

const restrictedCountries =
  process.env.REACT_APP_RESTRICTED_COUNTRIES?.split(',');

function AppRoutes() {
  const theme = useTheme();
  const { network } = useNetwork();

  const walletConnected = useAppSelector(
    state => state.polkamarkets.isLoggedIn
  );

  const [isLoading, setLoading] = useState(false);
  const [isAllowedCountry, setIsAllowedCountry] = useState(true);

  const isAllowedNetwork =
    !walletConnected || Object.keys(environment.NETWORKS).includes(network.id);

  if (theme.theme === 'dark') {
    document.documentElement.classList.add('theme--dark');
    document.documentElement.classList.remove('theme--light');
  } else {
    document.documentElement.classList.add('theme--light');
    document.documentElement.classList.remove('theme--dark');
  }

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

  if (isLoading)
    return (
      <div className="ta-center p-grid">
        <span className="spinner--primary d-inline-block" />
      </div>
    );

  if (!isAllowedCountry) return <RestrictedCountry />;

  if (!isAllowedNetwork) return <WrongNetwork />;

  return (
    <Layout>
      <Suspense
        fallback={
          <div className="ta-center">
            <span className="spinner--primary d-inline-block" />
          </div>
        }
      >
        <Switch>
          {Object.values(pages).map(page => (
            <Route
              key={page.name}
              exact={page.exact}
              path={page.pathname}
              component={page.Component}
            />
          ))}
          <Redirect from="/leaderboard/:slug" to="/clubs/:slug" />
        </Switch>
      </Suspense>
    </Layout>
  );
}

export default AppRoutes;
