import { NetworkConfig } from 'config/environment';
import { Network } from 'types/network';

declare global {
  interface Window {
    ethereum: any;
  }
}

export type NetworkContextState = {
  network: Network;
  networkConfig: NetworkConfig;
  setNetwork: (networkId: string) => void;
};
