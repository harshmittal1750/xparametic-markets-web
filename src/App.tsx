import { Suspense } from 'react';
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

import Init from 'pages/Init';

import { Layout } from 'components';

import FavoriteMarketsProvider from 'contexts/favoriteMarkets';
import { FiltersProvider } from 'contexts/filters';
import { NetworksProvider } from 'contexts/networks';
import ThemeProvider from 'contexts/theme';
import { VoteProvider } from 'contexts/vote';

import useInit, { InitActions } from 'hooks/useInit';

export default function App() {
  const init = useInit();

  if (init.type === InitActions.CHECKING)
    return (
      <div className="ta-center p-grid">
        <span className="spinner--primary d-inline-block" />
      </div>
    );
  if (init.type !== InitActions.SUCCESS) return <Init {...init} />;
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
