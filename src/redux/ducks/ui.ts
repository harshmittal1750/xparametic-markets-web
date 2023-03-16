import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

const MARKET_COLORS = 'MARKET_COLORS';
const initialState = {
  rightSidebar: {
    visible: false
  },
  tradeForm: {
    visible: false
  },
  liquidityForm: {
    visible: false
  },
  reportForm: {
    visible: false
  },
  market: {
    colors: JSON.parse(localStorage.getItem(MARKET_COLORS) || '{}') || {}
  }
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    closeRightSidebar: state => ({
      ...state,
      rightSidebar: {
        visible: false
      }
    }),
    openTradeForm: state => ({
      ...state,
      sidebar: {
        collapsed: true
      },
      rightSidebar: {
        visible: true
      },
      reportForm: {
        visible: false
      },
      tradeForm: {
        visible: true
      }
    }),
    closeTradeForm: state => ({
      ...state,
      tradeForm: {
        visible: false
      },
      rightSidebar: {
        visible: false
      }
    }),
    openLiquidityForm: state => ({
      ...state,
      tradeForm: {
        visible: false
      },
      liquidityForm: {
        visible: true
      }
    }),
    closeLiquidityForm: state => ({
      ...state,
      liquidityForm: {
        visible: false
      },
      tradeForm: {
        visible: true
      }
    }),
    openReportForm: state => ({
      ...state,
      liquidityForm: {
        visible: false
      },
      tradeForm: {
        visible: false
      },
      rightSidebar: {
        visible: true
      },
      reportForm: {
        visible: true
      }
    }),
    closeReportForm: state => ({
      ...state,
      rightSidebar: {
        visible: false
      },
      reportForm: {
        visible: false
      }
    }),
    setMarketColors: (state, action: PayloadAction<Record<string, string>>) => {
      const colors = {
        ...state.market.colors,
        ...action.payload
      };

      localStorage.setItem(MARKET_COLORS, JSON.stringify(colors));

      return {
        ...state,
        market: {
          colors
        }
      };
    }
  }
});

export default uiSlice.reducer;

export const {
  closeRightSidebar,
  openTradeForm,
  closeTradeForm,
  openLiquidityForm,
  closeLiquidityForm,
  openReportForm,
  closeReportForm,
  setMarketColors
} = uiSlice.actions;
