import { useEffect } from 'react';

import DayjsUtils from '@date-io/dayjs';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import Routes from 'routes';

import { SEO } from 'components';

import FavoriteMarketsProvider from 'contexts/favoriteMarkets';

import { useLocalStorage, useTheme } from 'hooks';

const POLKAMARKETS_DEFAULT_BANNER = `${process.env.PUBLIC_URL}/polkamarkets_meta.jpg`;

const App = () => {
  const { theme } = useTheme();
  const [localStorageTheme, setLocalStorageTheme] = useLocalStorage<string>(
    'theme',
    'dark'
  );

  useEffect(() => {
    setLocalStorageTheme(theme);
  }, [theme, setLocalStorageTheme]);

  return (
    <div className={`theme--${localStorageTheme || theme}`}>
      <SEO
        title="Polkamarkets - Autonomous Prediction Market Protocol"
        description="Polkamarkets is a DeFi-Powered Prediction Market built for cross-chain information exchange, based on Polkadot."
        imageUrl={POLKAMARKETS_DEFAULT_BANNER}
      />
      <MuiPickersUtilsProvider utils={DayjsUtils}>
        <FavoriteMarketsProvider>
          <Routes />
        </FavoriteMarketsProvider>
      </MuiPickersUtilsProvider>
    </div>
  );
};

export default App;
