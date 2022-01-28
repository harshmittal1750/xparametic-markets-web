import { useEffect, useState } from 'react';

import { environment } from 'config';
import { NetworkConfig } from 'config/environment';
import { fetchAditionalData, login } from 'redux/ducks/bepro';
import store from 'redux/store';

import useAppSelector from '../useAppSelector';
import NETWORKS, { Network, REACT_APP_NETWORK_ID } from './networks';

declare global {
  interface Window {
    ethereum: any;
  }
}

const defaultNetworkId = `0x${(Number(REACT_APP_NETWORK_ID) || 42).toString(
  16
)}`;
const defaultNetwork = NETWORKS[defaultNetworkId];

const availableNetworks = Object.keys(environment.NETWORKS);
const defaultNetworkConfig = environment.NETWORKS[defaultNetwork.id];

function fetchUserData(networkConfig: NetworkConfig) {
  store.dispatch(login(networkConfig));
  store.dispatch(fetchAditionalData(networkConfig));
}

function useNetwork() {
  const [network, setNetwork] = useState<Network>(defaultNetwork);
  const networkConfig = environment.NETWORKS[network.id];

  const metamaskWalletIsConnected = useAppSelector(
    state => state.bepro.isLoggedIn
  );

  useEffect(() => {
    async function getCurrentEthereumNetworkId() {
      if (window.ethereum) {
        const currentEthereumNetworkId = await window.ethereum.request({
          method: 'eth_chainId'
        });

        const currentEthereumNetwork =
          NETWORKS[currentEthereumNetworkId] || defaultNetwork;

        setNetwork(currentEthereumNetwork);

        if (
          metamaskWalletIsConnected &&
          availableNetworks.includes(currentEthereumNetwork.id)
        ) {
          fetchUserData(environment.NETWORKS[currentEthereumNetwork.id]);
        }
      }
    }

    getCurrentEthereumNetworkId();
  }, [metamaskWalletIsConnected]);

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on('chainChanged', () => {
        window.location.reload();
      });
      window.ethereum.on('accountsChanged', () => {
        window.location.reload();
      });
    }
  }, []);

  return {
    network,
    networkConfig: networkConfig || defaultNetworkConfig,
    setNetwork
  };
}

export default useNetwork;
