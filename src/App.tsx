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
import { getUserCountry } from 'helpers/location';
import store from 'redux/store';

import RestrictedCountry from 'pages/RestrictedCountry';

import { Layout } from 'components';

import FavoriteMarketsProvider from 'contexts/favoriteMarkets';
import { FiltersProvider } from 'contexts/filters';
import { NetworksProvider } from 'contexts/networks';
import ThemeProvider from 'contexts/theme';
import { VoteProvider } from 'contexts/vote';

export default function App() {
  const [isRestricted, setRestricted] = useState(false);
  const [isChecking, setChecking] = useState(true);

  useEffect(() => {
    (async function handleRestrictedCountry() {
      const restrictedCountries =
        process.env.REACT_APP_RESTRICTED_COUNTRIES?.split(',');

      if (restrictedCountries?.length) {
        try {
          const userCountry = await getUserCountry();

          setRestricted(restrictedCountries.includes(userCountry.countryCode));
          setChecking(false);
        } catch (error) {
          setChecking(false);

          // Give an UI for user to try again
          console.error(error);
        }
      }
    })();
  }, []);

  if (isChecking)
    return (
      <div className="ta-center p-grid">
        <span className="spinner--primary d-inline-block" />
      </div>
    );
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
