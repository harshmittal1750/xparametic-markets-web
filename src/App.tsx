import DayjsUtils from '@date-io/dayjs';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import Routes from 'routes';
import { ThemeProvider } from 'ui';

import { SEO } from 'components';

import FavoriteMarketsProvider from 'contexts/favoriteMarkets';

import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store from 'redux/store';

import './ui/useTheme/useTheme.scss';

export default function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <ThemeProvider>
          <MuiPickersUtilsProvider utils={DayjsUtils}>
            <FavoriteMarketsProvider>
              <SEO />
              <Routes />
            </FavoriteMarketsProvider>
          </MuiPickersUtilsProvider>
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  );
}
