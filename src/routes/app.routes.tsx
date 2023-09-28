import { Suspense } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import { pages, ui } from 'config';
import { Spinner } from 'ui';

import { Layout } from 'components';

import { useWhitelist } from 'contexts/whitelist';

export default function AppRoutes() {
  const { isEnabled } = useWhitelist();

  return (
    <Suspense fallback={<Spinner />}>
      <Switch>
        {isEnabled ? (
          <Route
            exact={pages.whitelist.exact}
            path={pages.whitelist.pathname}
            component={pages.whitelist.Component}
          />
        ) : null}
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
