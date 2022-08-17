import type { Network } from 'types/network';

import NETWORKS from 'hooks/useNetwork/networks';

// eslint-disable-next-line import/prefer-default-export
export function getNetworkBy<T extends keyof Network = keyof Network>(params: {
  type: T;
  value: Network[T];
}) {
  const [networkResolved] = Object.values(NETWORKS).filter(
    network => network[params.type] === [params.value].toString()
  );

  return networkResolved;
}
