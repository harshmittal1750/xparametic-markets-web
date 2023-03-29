import { create } from 'zustand';

import type { UseERC20BalanceStore } from './useERC20Balance.type';

const useERC20BalanceStore = create<UseERC20BalanceStore>(set => ({
  balance: 0,
  setBalance: balance => set({ balance }),
  isLoadingBalance: false,
  setIsLoadingBalance: isLoadingBalance => set({ isLoadingBalance })
}));

export default useERC20BalanceStore;
