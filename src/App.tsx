import { useEffect } from 'react';

import DayjsUtils from '@date-io/dayjs';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import Routes from 'routes';

import FavoriteMarketsProvider from 'contexts/favoriteMarkets';

import { useLocalStorage, useTheme } from 'hooks';

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
      <MuiPickersUtilsProvider utils={DayjsUtils}>
        <FavoriteMarketsProvider>
          <Routes />
        </FavoriteMarketsProvider>
      </MuiPickersUtilsProvider>
    </div>
  );
};

export default App;
