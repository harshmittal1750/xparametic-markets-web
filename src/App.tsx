import { useEffect } from 'react';

import DayjsUtils from '@date-io/dayjs';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { login } from 'redux/ducks/bepro';
import Routes from 'routes';

import { SEO } from 'components';

import FavoriteMarketsProvider from 'contexts/favoriteMarkets';

import { useAppDispatch, useLocalStorage, useNetwork, useTheme } from 'hooks';

const POLKAMARKETS_DEFAULT_BANNER = `${process.env.PUBLIC_URL}/polkamarkets_meta.jpg`;

const App = () => {
  const { theme } = useTheme();
  const [localStorageTheme, setLocalStorageTheme] = useLocalStorage<string>(
    'theme',
    'dark'
  );
  const dispatch = useAppDispatch();
  const { networkConfig } = useNetwork();

  useEffect(() => {
    setLocalStorageTheme(theme);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [theme]);

  useEffect(() => {
    dispatch(login(networkConfig));
  }, [dispatch, networkConfig]);

  const appTheme = localStorageTheme || theme;

  return (
    <div data-theme={appTheme} className={`theme--${appTheme}`}>
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
