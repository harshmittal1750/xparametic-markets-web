import { Suspense } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import { pages, ui } from 'config';
import { Spinner } from 'ui';

import { Layout } from 'components';

export default function AppRoutes() {
  return (
    <Suspense fallback={<Spinner />}>
      <Switch>
        <Route
          exact={pages.restrictedCountry.exact}
          path={pages.restrictedCountry.pathname}
          component={pages.restrictedCountry.Component}
        />
        <Route
          path="/"
          render={() => (
            <Layout>
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
            </Layout>
          )}
        />
      </Switch>
    </Suspense>
  );
}
