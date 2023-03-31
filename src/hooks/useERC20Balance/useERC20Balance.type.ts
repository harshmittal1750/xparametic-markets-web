export type UseERC20BalanceStore = {
  balance: number;
  setBalance: (balance: number) => void;
  isLoadingBalance: boolean;
  setIsLoadingBalance: (isLoading: boolean) => void;
};
