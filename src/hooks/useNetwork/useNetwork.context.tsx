import { createContext, ReactNode, useEffect, useState } from 'react';

import { useHistory, useLocation } from 'react-router-dom';

import { environment, networks } from 'config';
import { NetworkConfig } from 'config/environment';
import { toHexadecimal } from 'helpers/string';
import {
  changeNetworkId,
  fetchAditionalData,
  login
} from 'redux/ducks/polkamarkets';
import store from 'redux/store';
import { Network } from 'types/network';

import useAppDispatch from '../useAppDispatch';
import useAppSelector from '../useAppSelector';
import useLocalStorage from '../useLocalStorage';

import { NetworkContextState } from './useNetwork.type';

function fetchUserData(networkConfig: NetworkConfig) {
  store.dispatch(login(networkConfig));
  store.dispatch(fetchAditionalData(networkConfig));
}

export const NetworkContext = createContext<NetworkContextState>(
  {} as NetworkContextState
);

type NetworkProviderProps = {
  children: ReactNode;
};

function NetworkProvider({ children }: NetworkProviderProps) {
  // Constants
  const DEFAULT_NETWORK_ID = toHexadecimal(environment.NETWORK_ID || 42);
  const DEFAULT_NETWORK = networks[DEFAULT_NETWORK_ID];
  const DEFAULT_NETWORK_CONFIG = environment.NETWORKS[DEFAULT_NETWORK.id];

  const UNKNOWN_NETWORK = networks['0x270f'];

  const AVAILABLE_NETWORKS = Object.keys(environment.NETWORKS);

  // Third-party hooks
  const location = useLocation();
  const history = useHistory();

  // Custom hooks
  const dispatch = useAppDispatch();
  const [localNetwork, setLocalNetwork] = useLocalStorage<string>(
    'localNetwork',
    DEFAULT_NETWORK.id
  );

  // Redux state selectors
  const metamaskWalletIsConnected = useAppSelector(
    state => state.polkamarkets.isLoggedIn
  );
  const metamaskNetworkId = useAppSelector(
    state => state.polkamarkets.networkId
  );

  // Derivated state
  const metamaskNetwork = metamaskNetworkId
    ? networks[metamaskNetworkId] || UNKNOWN_NETWORK
    : null;

  const localEthereumNetworkId = toHexadecimal(localNetwork);
  const localEthereumNetwork =
    networks[localEthereumNetworkId] || UNKNOWN_NETWORK;

  const [network, setNetwork] = useState<Network>(
    metamaskNetwork || localEthereumNetwork || DEFAULT_NETWORK
  );

  const networkConfig = environment.NETWORKS[network.id];

  if (metamaskNetwork && network !== metamaskNetwork) {
    setNetwork(metamaskNetwork);
  }

  useEffect(() => {
    async function getCurrentEthereumNetworkId() {
      if (window.ethereum && metamaskWalletIsConnected) {
        const currentEthereumNetworkId = await window.ethereum.request({
          method: 'eth_chainId'
        });

        const currentEthereumNetwork =
          networks[currentEthereumNetworkId] || UNKNOWN_NETWORK;

        setNetwork(currentEthereumNetwork);

        if (
          metamaskWalletIsConnected &&
          AVAILABLE_NETWORKS.includes(currentEthereumNetwork.id) &&
          currentEthereumNetworkId !== metamaskNetworkId
        ) {
          fetchUserData(environment.NETWORKS[currentEthereumNetwork.id]);
        }
        // changing networkId on redux only after fetch portfolio has been called
        dispatch(changeNetworkId(currentEthereumNetworkId));
      } else {
        setNetwork(localEthereumNetwork);
      }
    }

    getCurrentEthereumNetworkId();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localNetwork]);

  function reloadWindow() {
    history.push(`${location.pathname}?m=f`);
    window.location.reload();
  }

  useEffect(() => {
    window.ethereum?.on('chainChanged', reloadWindow);

    return () => window.ethereum?.removeListener('chainChanged', reloadWindow);
  }, []);

  useEffect(() => {
    window.ethereum?.on('accountsChanged', reloadWindow);

    return () =>
      window.ethereum?.removeListener('accountsChanged', reloadWindow);
  }, []);

  return (
    <NetworkContext.Provider
      value={{
        network,
        networkConfig: networkConfig || DEFAULT_NETWORK_CONFIG,
        setNetwork: setLocalNetwork
      }}
    >
      {children}
    </NetworkContext.Provider>
  );
}

export default NetworkProvider;
