import { Suspense, lazy } from 'react';
import { Provider } from 'react-redux';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';

import DayjsUtils from '@date-io/dayjs';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import store from 'redux/store';

import { Layout } from 'components';

import FavoriteMarketsProvider from 'contexts/favoriteMarkets';
import { FiltersProvider } from 'contexts/filters';
import { NetworksProvider } from 'contexts/networks';
import ThemeProvider from 'contexts/theme';
import { VoteProvider } from 'contexts/vote';

const Leaderboard = lazy(() => import('pages/Leaderboard'));
const routes = [
  ['/', lazy(() => import('pages/Home'))],
  ['/leaderboard', Leaderboard],
  ['/clubs', lazy(() => import('pages/Clubs'))],
  ['/markets', lazy(() => import('pages/Market'))],
  ['/portfolio', lazy(() => import('pages/Portfolio'))],
  ['/market/create', lazy(() => import('pages/CreateMarket'))],
  ['/achievements', lazy(() => import('pages/Achievements'))],
  ['/clubs/:slug', Leaderboard],
  ['/user/:address', lazy(() => import('pages/Profile'))]
] as const;

export default function App() {
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
                        fallback={<span className="spinner--primary" />}
                      >
                        <Switch>
                          {routes.map(([path, Component], index) => (
                            <Route
                              key={path}
                              exact={index <= 2}
                              path={path}
                              component={Component}
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
