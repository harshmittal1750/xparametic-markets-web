import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

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
    avatar: {
      color: localStorage.getItem('MARKET_AVATAR_COLOR') || ''
    }
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
    setMarketAvatarColor: (state, action: PayloadAction<string>) => {
      const color = action.payload;

      localStorage.setItem('MARKET_AVATAR_COLOR', color);

      return {
        ...state,
        market: {
          avatar: {
            color
          }
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
  setMarketAvatarColor
} = uiSlice.actions;
