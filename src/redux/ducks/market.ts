import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Market } from 'models/market';
import * as marketService from 'services/Polkamarkets/market';

const chartViewsEnum = [
  { id: 'marketOverview', name: 'Market Overview', color: 'default' },
  { id: 'tradingView', name: 'TradingView', color: 'default' }
];

export interface MarketInitialState {
  market: Market;
  chartViews: Array<any>;
  chartViewType: string;
  isLoading: boolean;
  error: any;
}

const initialState: MarketInitialState = {
  market: {
    id: '',
    slug: '',
    category: '',
    subcategory: '',
    imageUrl: '',
    bannerUrl: '',
    title: '',
    volume: 0,
    shares: 0,
    liquidity: 0,
    liquidityPrice: 0,
    createdAt: '',
    expiresAt: '',
    state: 'open',
    verified: false,
    voided: false,
    questionId: '',
    networkId: '',
    resolvedOutcomeId: -1,
    outcomes: [
      {
        id: '-1',
        marketId: '',
        title: '',
        price: 0,
        change: {
          type: '',
          chartData: []
        },
        priceCharts: [],
        shares: 0
      },
      {
        id: '-2',
        marketId: '',
        title: '',
        price: 0,
        change: {
          type: '',
          chartData: []
        },
        priceCharts: [],
        shares: 0
      }
    ],
    tradingViewSymbol: null,
    fee: 0,
    question: {
      id: '0x0000000000000000000000000000000000000000000000000000000000000000',
      bond: 0,
      bestAnswer:
        '0x0000000000000000000000000000000000000000000000000000000000000000',
      isFinalized: false,
      isClaimed: false,
      finalizeTs: 0
    }
  },
  chartViews: chartViewsEnum,
  chartViewType: 'marketOverview',
  isLoading: false,
  error: null
};

const marketSlice = createSlice({
  name: 'market',
  initialState,
  reducers: {
    request: state => ({
      ...state,
      isLoading: true
    }),
    success: {
      reducer: (state, action: PayloadAction<Market>) => ({
        ...state,
        market: action.payload,
        isLoading: false
      }),
      prepare: (market: Market) => {
        return {
          payload: {
            ...market,
            outcomes: market.outcomes.map(outcome => ({
              ...outcome,
              price: Number(outcome.price.toFixed(3))
            }))
          }
        };
      }
    },
    error: (state, action) => ({
      ...state,
      market: initialState.market,
      isLoading: false,
      error: action.payload
    }),
    marketSelected: {
      reducer: (state, action: PayloadAction<Market>) => ({
        ...state,
        market: action.payload
      }),
      prepare: (market: Market) => {
        return {
          payload: {
            ...market,
            outcomes: market.outcomes.map(outcome => ({
              ...outcome,
              price: Number(outcome.price.toFixed(3))
            }))
          }
        };
      }
    },
    clearMarket: state => ({
      ...state,
      market: initialState.market
    }),
    setChartViewType: (state, action: PayloadAction<string>) => ({
      ...state,
      chartViewType: action.payload
    }),
    changeOutcomeData: (state, action) => ({
      ...state,
      market: {
        ...state.market,
        outcomes: state.market.outcomes.map((outcome, index) =>
          index === action.payload.outcomeId
            ? { ...outcome, ...action.payload.data }
            : outcome
        )
      }
    }),
    changeQuestion: (state, action) => ({
      ...state,
      market: {
        ...state.market,
        question: action.payload
      }
    }),
    changeData: (state, action) => ({
      ...state,
      market: {
        ...state.market,
        ...action.payload.data
      }
    })
  }
});

export default marketSlice.reducer;

const {
  request,
  success,
  error,
  marketSelected,
  clearMarket,
  changeOutcomeData,
  changeQuestion,
  changeData,
  setChartViewType
} = marketSlice.actions;

export {
  marketSelected,
  clearMarket,
  changeOutcomeData,
  changeQuestion,
  changeData,
  setChartViewType
};

export function getMarket(marketSlug: string) {
  return async dispatch => {
    dispatch(request());
    try {
      const response = await marketService.getMarket(marketSlug);
      const { data } = response;
      dispatch(success(data));
    } catch (err) {
      dispatch(error(err));
    }
  };
}
