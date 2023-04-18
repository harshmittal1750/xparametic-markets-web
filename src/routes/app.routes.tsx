import { Suspense, useEffect, useState } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import { pages, ui } from 'config';
import { getUserCountry } from 'helpers/location';
import { Spinner } from 'ui';

import RestrictedCountry from 'pages/RestrictedCountry';

import { Layout } from 'components';

const restrictedCountries =
  process.env.REACT_APP_RESTRICTED_COUNTRIES?.split(',');

export default function AppRoutes() {
  const [isLoading, setLoading] = useState(true);
  const [isRestricted, setRestricted] = useState<boolean | undefined>(false);

  useEffect(() => {
    (async function handleCountry() {
      try {
        const userCountry = await getUserCountry();

        setLoading(false);
        setRestricted(restrictedCountries?.includes(userCountry.countryCode));
      } catch (error) {
        // unsupported
      }
    })();
  }, []);

  if (isLoading) return <Spinner />;

  if (isRestricted) return <RestrictedCountry />;

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
