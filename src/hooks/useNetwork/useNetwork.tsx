import { useEffect, useState } from 'react';

import { environment } from 'config';
import { NetworkConfig } from 'config/environment';
import { toHexadecimal } from 'helpers/string';
import { changeNetworkId, fetchAditionalData, login } from 'redux/ducks/bepro';
import store from 'redux/store';

import { useAppDispatch } from 'hooks';

import useAppSelector from '../useAppSelector';
import useLocalStorage from '../useLocalStorage';
import NETWORKS, { Network, REACT_APP_NETWORK_ID } from './networks';

declare global {
  interface Window {
    ethereum: any;
  }
}

const DEFAULT_NETWORK_ID = toHexadecimal(REACT_APP_NETWORK_ID || 42);
const DEFAULT_NETWORK = NETWORKS[DEFAULT_NETWORK_ID];
const DEFAULT_NETWORK_CONFIG = environment.NETWORKS[DEFAULT_NETWORK.id];

const UNKNOWN_NETWORK = NETWORKS['0x270f'];

const AVAILABLE_NETWORKS = Object.keys(environment.NETWORKS);

function fetchUserData(networkConfig: NetworkConfig) {
  store.dispatch(login(networkConfig));
  store.dispatch(fetchAditionalData(networkConfig));
}

function useNetwork() {
  // Custom hooks
  const dispatch = useAppDispatch();
  const [localNetwork, setLocalNetwork] = useLocalStorage<string>(
    'localNetwork',
    DEFAULT_NETWORK.id
  );

  // Redux state selectors
  const metamaskWalletIsConnected = useAppSelector(
    state => state.bepro.isLoggedIn
  );
  const metamaskNetworkId = useAppSelector(state => state.bepro.networkId);

  // Derivated state
  const metamaskNetwork = metamaskNetworkId
    ? NETWORKS[metamaskNetworkId] || UNKNOWN_NETWORK
    : null;

  const localEthereumNetworkId = toHexadecimal(localNetwork);
  const localEthereumNetwork =
    NETWORKS[localEthereumNetworkId] || UNKNOWN_NETWORK;

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
          NETWORKS[currentEthereumNetworkId] || UNKNOWN_NETWORK;

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
  }, [localNetwork]);

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on('chainChanged', () => {
        window.location.reload();
      });
    }
  }, []);

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', () => {
        window.location.reload();
      });
    }
  }, []);

  return {
    network,
    networkConfig: networkConfig || DEFAULT_NETWORK_CONFIG,
    setNetwork: setLocalNetwork
  };
}

export default useNetwork;
