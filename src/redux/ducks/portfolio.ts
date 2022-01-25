import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Portfolio } from 'models/portfolio';
import * as portfolioService from 'services/Polkamarkets/portfolio';

export interface PortfolioInitialState {
  portfolio: Portfolio;
  filter: string;
  isLoading: boolean;
  error: any;
}

const initialState: PortfolioInitialState = {
  portfolio: {
    address: '',
    holdingsValue: 0,
    holdingsPerformance: {
      change: 0,
      changePercent: 0
    },
    closedMarketsProfit: 0,
    openPositions: 0,
    liquidityProvided: 0,
    liquidityFeesEarned: 0,
    holdingsChart: []
  },
  filter: 'open',
  isLoading: false,
  error: null
};

const portfolioSlice = createSlice({
  name: 'portfolio',
  initialState,
  reducers: {
    request: state => ({
      ...state,
      isLoading: true
    }),
    success: {
      reducer: (state, action: PayloadAction<Portfolio>) => ({
        ...state,
        portfolio: action.payload,
        isLoading: false
      }),
      prepare: (portfolio: Portfolio) => {
        return {
          payload: {
            ...portfolio
          }
        };
      }
    },
    error: (state, action) => ({
      ...state,
      market: initialState.portfolio,
      isLoading: false,
      error: action.payload
    }),
    setFilter: (state, action) => ({
      ...state,
      filter: action.payload
    })
  }
});

export default portfolioSlice.reducer;

const { request, success, error, setFilter } = portfolioSlice.actions;

export { setFilter };

export function getPortfolio(address: string, networkId: string) {
  return async dispatch => {
    // only fetching portfolio if address is present
    if (!address) return;

    dispatch(request());
    try {
      const response = await portfolioService.getPortfolio(address, networkId);
      const { data } = response;
      dispatch(success(data));
    } catch (err) {
      dispatch(error(err));
    }
  };
}
