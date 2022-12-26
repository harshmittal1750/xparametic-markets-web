import { useEffect } from 'react';

import DayjsUtils from '@date-io/dayjs';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { login } from 'redux/ducks/polkamarkets';
import Routes from 'routes';

import { SEO } from 'components';

import FavoriteMarketsProvider from 'contexts/favoriteMarkets';
import { FiltersProvider } from 'contexts/filters';
import { NetworksProvider } from 'contexts/networks';
import { VoteProvider } from 'contexts/vote';

import { useAppDispatch, useNetwork } from 'hooks';

const IFL_DEFAULT_BANNER = `${process.env.PUBLIC_URL}/ifl_meta.jpg`;

export default function App() {
  const dispatch = useAppDispatch();
  const { networkConfig } = useNetwork();

  useEffect(() => {
    dispatch(login(networkConfig));
  }, [dispatch, networkConfig]);

  return (
    <MuiPickersUtilsProvider utils={DayjsUtils}>
      <NetworksProvider>
        <FiltersProvider>
          <VoteProvider>
            <FavoriteMarketsProvider>
              <SEO
                title="Illuminate Fantasy League, Powered By Polkamarkets"
                description="The Illuminate Fantasy League is a prediction marketplace powered by Polkamarkets, made to celebrate the Football World Cup 2022 with the Moonbeam Community. Join now, bring your friends and start placing your World Cup Predictions for every tournament match to win the IFC title!"
                imageUrl={IFL_DEFAULT_BANNER}
              />
              <Routes />
            </FavoriteMarketsProvider>
          </VoteProvider>
        </FiltersProvider>
      </NetworksProvider>
    </MuiPickersUtilsProvider>
  );
}
