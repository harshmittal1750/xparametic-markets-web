import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PolkamarketsService } from 'services';

export type Action = {
  action: string;
  marketId: number;
  outcomeId: number;
  shares: number;
  value: number;
  timestamp: number;
  transactionHash: string;
};

export type Votes = { [key: string]: { upvoted: boolean; downvoted: boolean } };

export type PolkamarketsInitialState = {
  isLoggedIn: boolean;
  ethAddress: string;
  ethBalance: number;
  polkBalance: number;
  polkApproved: boolean;
  portfolio: any;
  actions: Action[];
  marketsWithActions: string[];
  bonds: any;
  marketsWithBonds: string[];
  bondActions: any[];
  votes: Votes;
  isLoading: {
    portfolio: boolean;
    bonds: boolean;
    actions: boolean;
    votes: boolean;
  };
};

const initialState: PolkamarketsInitialState = {
  isLoggedIn: false,
  ethAddress: '',
  ethBalance: 0,
  polkBalance: 0,
  polkApproved: false,
  portfolio: {},
  actions: [],
  marketsWithActions: [],
  bonds: {},
  marketsWithBonds: [],
  bondActions: [],
  votes: {},
  isLoading: {
    portfolio: false,
    bonds: false,
    actions: false,
    votes: false
  }
};

const polkamarketsSlice = createSlice({
  name: 'polkamarkets',
  initialState,
  reducers: {
    changeIsLoggedIn: (state, action: PayloadAction<boolean>) => ({
      ...state,
      isLoggedIn: action.payload
    }),
    changeEthAddress: (state, action: PayloadAction<string>) => ({
      ...state,
      ethAddress: action.payload
    }),
    changeEthBalance: (state, action: PayloadAction<number>) => ({
      ...state,
      ethBalance: action.payload
    }),
    changePolkBalance: (state, action: PayloadAction<number>) => ({
      ...state,
      polkBalance: action.payload
    }),
    changePolkApproved: (state, action: PayloadAction<boolean>) => ({
      ...state,
      polkApproved: action.payload
    }),
    changePortfolio: (state, action: PayloadAction<Object>) => ({
      ...state,
      portfolio: action.payload
    }),
    changeActions: (state, action: PayloadAction<Action[]>) => ({
      ...state,
      actions: action.payload
    }),
    changeMarketsWithActions: {
      reducer: (state, action: PayloadAction<string[]>) => ({
        ...state,
        marketsWithActions: action.payload
      }),
      prepare: (actions: Action[]) => {
        return {
          payload: actions.map(action => action.marketId.toString())
        };
      }
    },
    changeBonds: (state, action: PayloadAction<Object>) => ({
      ...state,
      bonds: action.payload
    }),
    changeMarketsWithBonds: (state, action: PayloadAction<string[]>) => ({
      ...state,
      marketsWithBonds: action.payload
    }),
    changeBondActions: (state, action: PayloadAction<any>) => ({
      ...state,
      bondActions: action.payload
    }),
    changeVotes: (state, action: PayloadAction<Votes>) => ({
      ...state,
      votes: action.payload
    }),
    changeVoteByMarketId: (
      state,
      action: PayloadAction<{
        marketId: string;
        vote: { upvoted: boolean; downvoted: boolean };
      }>
    ) => {
      const { marketId, vote } = action.payload;
      return {
        ...state,
        votes: {
          ...state.votes,
          [marketId]: vote
        }
      };
    },
    changeLoading: (
      state,
      action: PayloadAction<{ key: string; value: boolean }>
    ) => ({
      ...state,
      isLoading: {
        ...state.isLoading,
        [action.payload.key]: action.payload.value
      }
    })
  }
});

export default polkamarketsSlice.reducer;

const {
  changeIsLoggedIn,
  changeEthAddress,
  changeEthBalance,
  changePolkBalance,
  changePolkApproved,
  changePortfolio,
  changeActions,
  changeMarketsWithActions,
  changeBonds,
  changeMarketsWithBonds,
  changeBondActions,
  changeVotes,
  changeVoteByMarketId,
  changeLoading
} = polkamarketsSlice.actions;

// fetching initial wallet details
function login(polkamarketsService: PolkamarketsService) {
  return async dispatch => {
    const isLoggedIn = await polkamarketsService.isLoggedIn();
    dispatch(changeIsLoggedIn(isLoggedIn));

    if (isLoggedIn) {
      await polkamarketsService.login();

      const address = await polkamarketsService.getAddress();
      dispatch(changeEthAddress(address));

      const balance = await polkamarketsService.getBalance();
      dispatch(changeEthBalance(balance));

      const polkBalance = await polkamarketsService.getERC20Balance();
      dispatch(changePolkBalance(polkBalance));

      const polkApproved = await polkamarketsService.isRealitioERC20Approved();
      dispatch(changePolkApproved(polkApproved));
    }
  };
}

function fetchAditionalData(polkamarketsService: PolkamarketsService) {
  return async dispatch => {
    const isLoggedIn = await polkamarketsService.isLoggedIn();

    if (isLoggedIn) {
      await polkamarketsService.login();

      dispatch(
        changeLoading({
          key: 'portfolio',
          value: true
        })
      );

      dispatch(
        changeLoading({
          key: 'bonds',
          value: true
        })
      );

      dispatch(
        changeLoading({
          key: 'actions',
          value: true
        })
      );

      dispatch(
        changeLoading({
          key: 'votes',
          value: true
        })
      );

      const portfolio = await polkamarketsService.getPortfolio();
      dispatch(changePortfolio(portfolio));

      const votes = (await polkamarketsService.getUserVotes()) as Votes;
      dispatch(changeVotes(votes));

      const bonds = await polkamarketsService.getBonds();
      dispatch(changeBonds(bonds));

      const bondMarketIds = await polkamarketsService.getBondMarketIds();
      dispatch(changeMarketsWithBonds(bondMarketIds));

      dispatch(
        changeLoading({
          key: 'portfolio',
          value: false
        })
      );

      dispatch(
        changeLoading({
          key: 'bonds',
          value: false
        })
      );

      dispatch(
        changeLoading({
          key: 'votes',
          value: false
        })
      );

      const actions = (await polkamarketsService.getActions()) as Action[];
      dispatch(changeActions(actions));
      dispatch(changeMarketsWithActions(actions));

      dispatch(
        changeLoading({
          key: 'actions',
          value: false
        })
      );

      const bondActions = await polkamarketsService.getBondActions();
      dispatch(changeBondActions(bondActions));
    }
  };
}

export {
  changeIsLoggedIn,
  changeEthAddress,
  changeEthBalance,
  changePolkBalance,
  changePolkApproved,
  changePortfolio,
  changeActions,
  changeBonds,
  changeBondActions,
  changeVoteByMarketId,
  login,
  fetchAditionalData
};
