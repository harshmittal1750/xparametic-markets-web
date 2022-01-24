import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NetworkConfig } from 'config/environment';
import { BeproService } from 'services';

const initialState = {
  isLoggedIn: false,
  ethAddress: '',
  ethBalance: 0,
  polkBalance: 0,
  polkApproved: false,
  portfolio: {},
  actions: [],
  bonds: {},
  bondActions: [],
  isLoading: {
    portfolio: false
  }
};

const beproSlice = createSlice({
  name: 'bepro',
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
    changeActions: (state, action: PayloadAction<any>) => ({
      ...state,
      actions: action.payload
    }),
    changeBonds: (state, action: PayloadAction<Object>) => ({
      ...state,
      bonds: action.payload
    }),
    changeBondActions: (state, action: PayloadAction<any>) => ({
      ...state,
      bondActions: action.payload
    }),
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

export default beproSlice.reducer;

const {
  changeIsLoggedIn,
  changeEthAddress,
  changeEthBalance,
  changePolkBalance,
  changePolkApproved,
  changePortfolio,
  changeActions,
  changeBonds,
  changeBondActions,
  changeLoading
} = beproSlice.actions;

// fetching initial wallet details
function login(networkConfig: NetworkConfig) {
  return async dispatch => {
    const beproService = new BeproService(networkConfig);

    const isLoggedIn = await beproService.isLoggedIn();
    dispatch(changeIsLoggedIn(isLoggedIn));

    if (isLoggedIn) {
      await beproService.login();

      const address = await beproService.getAddress();
      dispatch(changeEthAddress(address));

      const balance = await beproService.getBalance();
      dispatch(changeEthBalance(balance));

      const polkBalance = await beproService.getERC20Balance();
      dispatch(changePolkBalance(polkBalance));

      const polkApproved = await beproService.isRealitioERC20Approved();
      dispatch(changePolkApproved(polkApproved));
    }
  };
}

function fetchAditionalData(networkConfig: NetworkConfig) {
  return async dispatch => {
    const beproService = new BeproService(networkConfig);
    const isLoggedIn = await beproService.isLoggedIn();

    if (isLoggedIn) {
      await beproService.login();

      dispatch(
        changeLoading({
          key: 'portfolio',
          value: true
        })
      );

      const portfolio = await beproService.getPortfolio();
      dispatch(changePortfolio(portfolio));

      const bonds = await beproService.getBonds();
      dispatch(changeBonds(bonds));

      dispatch(
        changeLoading({
          key: 'portfolio',
          value: false
        })
      );

      const actions = await beproService.getActions();
      dispatch(changeActions(actions));

      const bondActions = await beproService.getBondActions();
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
  login,
  fetchAditionalData
};
