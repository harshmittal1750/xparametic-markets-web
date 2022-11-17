import { useEffect } from 'react';

import DayjsUtils from '@date-io/dayjs';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { login } from 'redux/ducks/polkamarkets';
import Routes from 'routes';

import { SEO } from 'components';

import FavoriteMarketsProvider from 'contexts/favoriteMarkets';
import { FiltersProvider } from 'contexts/filters';
import { NetworksProvider } from 'contexts/networks';

import { useAppDispatch, useNetwork, usePrevious, useTheme } from 'hooks';

const IFL_DEFAULT_BANNER = `${process.env.PUBLIC_URL}/ifl_meta.png`;

const App = () => {
  const { theme } = useTheme();
  const dispatch = useAppDispatch();
  const { networkConfig } = useNetwork();
  const themeCn = `theme--${theme}`;
  const { current: themeCnPrev } = usePrevious(themeCn);

  document.documentElement.dataset.theme = theme;
  if (themeCnPrev && themeCn !== themeCnPrev) {
    document.documentElement.classList.replace(themeCnPrev, themeCn);
  } else {
    document.documentElement.classList.add(themeCn);
  }

  useEffect(() => {
    dispatch(login(networkConfig));
  }, [dispatch, networkConfig]);

  return (
    <MuiPickersUtilsProvider utils={DayjsUtils}>
      <NetworksProvider>
        <FiltersProvider>
          <FavoriteMarketsProvider>
            <SEO
              title="Illuminate Fantasy League, Powered By Polkamarkets"
              description="The Illuminate Fantasy League is a prediction marketplace powered by Polkamarkets, made to celebrate the Football World Cup 2022 with the Moonbeam Community. Join now, bring your friends and start placing your World Cup Predictions for every tournament match to win the IFC title!"
              imageUrl={IFL_DEFAULT_BANNER}
            />
            <Routes />
          </FavoriteMarketsProvider>
        </FiltersProvider>
      </NetworksProvider>
    </MuiPickersUtilsProvider>
  );
};

export default App;
