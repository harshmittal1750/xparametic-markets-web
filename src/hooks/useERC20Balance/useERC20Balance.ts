import { useEffect, useState } from 'react';

import usePolkamarketsService from 'hooks/usePolkamarketsService';

function useERC20Balance(erc20ContractAddress: string) {
  const polkamarketsService = usePolkamarketsService();

  const [balance, setBalance] = useState<number>(0);
  const [isLoadingBalance, setIsLoadingBalance] = useState(false);

  useEffect(() => {
    async function fetchBalance() {
      setIsLoadingBalance(true);
      const erc20Balance = await polkamarketsService.getERC20Balance(
        erc20ContractAddress
      );
      setIsLoadingBalance(false);

      setBalance(erc20Balance);
    }

    fetchBalance();
  }, [erc20ContractAddress, polkamarketsService]);

  return { balance, isLoadingBalance };
}

export default useERC20Balance;
