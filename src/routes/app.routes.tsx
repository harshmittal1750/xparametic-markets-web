import { Suspense, lazy, useEffect, useState } from 'react';
import { Switch, Route, Redirect, useHistory } from 'react-router-dom';

import { pages, ui } from 'config';
import { getUserCountry } from 'helpers/location';
import { Spinner } from 'ui';

import { Layout } from 'components';

const restrictedCountries =
  process.env.REACT_APP_RESTRICTED_COUNTRIES?.split(',');

const RestrictedCountry = lazy(() => import('pages/RestrictedCountry'));

export default function AppRoutes() {
  const history = useHistory();
  const [isLoading, setLoading] = useState(true);
  const [isRestricted, setRestricted] = useState(false);

  useEffect(() => {
    (async function handleCountry() {
      try {
        const userCountry = await getUserCountry();

        setRestricted(!!restrictedCountries?.includes(userCountry.countryCode));
        history.push('/blocked');
      } finally {
        setLoading(false);
      }
    })();
  }, [history]);

  if (isLoading) return <Spinner />;

  if (isRestricted)
    return (
      <Suspense fallback={<Spinner />}>
        <Switch>
          <Route exact path="/blocked" component={RestrictedCountry} />
        </Switch>
      </Suspense>
    );

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
