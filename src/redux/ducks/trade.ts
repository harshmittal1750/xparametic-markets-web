import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type TradeType = 'buy' | 'sell' | string;

export interface TradeDetails {
  shares: number;
  price: number;
  maxROI: number;
  totalStake: number;
  maxStake: number;
  fee: number;
}

const initialState = {
  type: 'buy',
  selectedMarketId: '',
  selectedMarketNetworkId: '',
  selectedOutcomeId: '',
  wrapped: false,
  amount: 0,
  maxAmount: 0,
  shares: 0,
  price: 0,
  maxROI: 0,
  totalStake: 0,
  maxStake: 0,
  fee: 0,
  acceptRules: false,
  acceptOddChanges: false
};

const tradeSlice = createSlice({
  name: 'trade',
  initialState,
  reducers: {
    changeTradeType: (state, action: PayloadAction<TradeType>) => ({
      ...state,
      type: action.payload
    }),
    setTradeAmount: (state, action) => ({
      ...state,
      amount: action.payload
    }),
    setMaxAmount: (state, action) => ({
      ...state,
      maxAmount: action.payload
    }),
    setWrapped: (state, action) => ({
      ...state,
      wrapped: action.payload
    }),
    outcomeSelected: (state, action) => ({
      ...state,
      selectedMarketId: action.payload.marketId,
      selectedMarketNetworkId: action.payload.marketNetworkId,
      selectedOutcomeId: action.payload.outcomeId
    }),
    setTradeDetails: (state, action: PayloadAction<TradeDetails>) => ({
      ...state,
      shares: action.payload.shares,
      price: action.payload.price,
      maxROI: action.payload.maxROI,
      totalStake: action.payload.totalStake,
      maxStake: action.payload.maxStake,
      fee: action.payload.fee
    }),
    toggleAcceptRules: (state, action: PayloadAction<boolean>) => ({
      ...state,
      acceptRules: action.payload
    }),
    toggleAcceptOddChanges: (state, action: PayloadAction<boolean>) => ({
      ...state,
      acceptOddChanges: action.payload
    }),
    reset: () => ({
      ...initialState
    })
  }
});

export default tradeSlice.reducer;

const {
  changeTradeType,
  outcomeSelected,
  setTradeDetails,
  setTradeAmount,
  setMaxAmount,
  setWrapped,
  toggleAcceptRules,
  toggleAcceptOddChanges,
  reset
} = tradeSlice.actions;

export {
  changeTradeType,
  outcomeSelected,
  setTradeDetails,
  setTradeAmount,
  setMaxAmount,
  setWrapped,
  toggleAcceptRules,
  toggleAcceptOddChanges,
  reset
};

export function selectOutcome(
  marketId: string,
  marketNetworkId: string,
  outcomeId: string | number
) {
  return async dispatch => {
    dispatch(outcomeSelected({ marketId, marketNetworkId, outcomeId }));
  };
}
