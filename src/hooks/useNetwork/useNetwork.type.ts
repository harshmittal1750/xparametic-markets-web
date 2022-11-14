import { NetworkConfig } from 'config/environment';
import { Network } from 'types/network';

import { SetValue } from 'hooks/useLocalStorage';

declare global {
  interface Window {
    ethereum: any;
  }
}

export type NetworkContextState = {
  network: Network;
  networkConfig: NetworkConfig;
  setNetwork: SetValue<string>;
};
