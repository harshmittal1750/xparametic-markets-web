import { createContext, ReactNode, useMemo } from 'react';

import { PolkamarketsService } from 'services';

import useNetwork from 'hooks/useNetwork';

import type { PolkamarketsServiceContextState } from './usePolkamarketsService.type';

export const PolkamarketsServiceContext =
  createContext<PolkamarketsServiceContextState>(
    {} as PolkamarketsServiceContextState
  );

type PolkamarketsServiceProviderProps = {
  children: ReactNode;
};

function PolkamarketsServiceProvider({
  children
}: PolkamarketsServiceProviderProps) {
  const { networkConfig } = useNetwork();

  const instance = useMemo(
    () => new PolkamarketsService(networkConfig),
    [networkConfig]
  );

  return (
    <PolkamarketsServiceContext.Provider
      value={{
        instance
      }}
    >
      {children}
    </PolkamarketsServiceContext.Provider>
  );
}

export default PolkamarketsServiceProvider;
