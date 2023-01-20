import { Suspense, useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';

import DayjsUtils from '@date-io/dayjs';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { pages } from 'config';
import store from 'redux/store';
import Spinner from 'ui/Spinner';

import RestrictedCountry from 'pages/RestrictedCountry';

import { Layout } from 'components';

import FavoriteMarketsProvider from 'contexts/favoriteMarkets';
import { FiltersProvider } from 'contexts/filters';
import { NetworksProvider } from 'contexts/networks';
import ThemeProvider from 'contexts/theme';
import { VoteProvider } from 'contexts/vote';

export default function App() {
  const [isLoading, setLoading] = useState(true);
  const [isRestricted, setRestricted] = useState(false);

  useEffect(() => {
    (async function handleRestrictedCountry() {
      const restrictedCountries =
        process.env.REACT_APP_RESTRICTED_COUNTRIES?.split(',');
      const { getUserCountry } = await import('helpers/location');
      const { countryCode } = await getUserCountry();

      setLoading(false);
      setRestricted(!!restrictedCountries?.includes(countryCode));
    })();
  }, []);

  if (isLoading) return <Spinner />;
  if (isRestricted) return <RestrictedCountry />;
  return (
    <ThemeProvider>
      <Provider store={store}>
        <Router>
          <MuiPickersUtilsProvider utils={DayjsUtils}>
            <NetworksProvider>
              <FiltersProvider>
                <FavoriteMarketsProvider>
                  <VoteProvider>
                    <Layout>
                      <Suspense fallback={<Spinner />}>
                        <Switch>
                          {Object.values(pages).map(page => (
                            <Route
                              key={page.name}
                              exact={page.exact}
                              path={page.pathname}
                              component={page.Component}
                            />
                          ))}
                          <Redirect
                            from="/leaderboard/:slug"
                            to="/clubs/:slug"
                          />
                        </Switch>
                      </Suspense>
                    </Layout>
                  </VoteProvider>
                </FavoriteMarketsProvider>
              </FiltersProvider>
            </NetworksProvider>
          </MuiPickersUtilsProvider>
        </Router>
      </Provider>
    </ThemeProvider>
  );
}
