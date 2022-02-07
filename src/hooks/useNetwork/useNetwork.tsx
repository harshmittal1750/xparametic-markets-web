import { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import { environment } from 'config';
import { NetworkConfig } from 'config/environment';
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
  const dispatch = useAppDispatch();
  const metamaskWalletIsConnected = useAppSelector(
    state => state.bepro.isLoggedIn
  );
  const metamaskNetworkId = useAppSelector(state => state.bepro.networkId);
  const metamaskNetwork = NETWORKS[metamaskNetworkId];

  const [network, setNetwork] = useState<Network>(
    metamaskNetwork || defaultNetwork
  );

  if (metamaskNetwork && network !== metamaskNetwork) {
    setNetwork(metamaskNetwork);
  }
  const [localNetwork, setLocalNetwork] = useLocalStorage<string>(
    'localNetwork',
    defaultNetwork.id
  );
  const location = useLocation();
  const history = useHistory();
  const networkConfig = environment.NETWORKS[network.id];

  useEffect(() => {
    async function getCurrentEthereumNetworkId() {
      if (window.ethereum && metamaskWalletIsConnected) {
        const currentEthereumNetworkId = await window.ethereum.request({
          method: 'eth_chainId'
        });

        const currentEthereumNetwork =
          NETWORKS[currentEthereumNetworkId] || defaultNetwork;

        setNetwork(currentEthereumNetwork);

        if (
          metamaskWalletIsConnected &&
          availableNetworks.includes(currentEthereumNetwork.id) &&
          currentEthereumNetworkId !== metamaskNetworkId
        ) {
          fetchUserData(environment.NETWORKS[currentEthereumNetwork.id]);
          dispatch(changeNetworkId(currentEthereumNetworkId));
        }
      } else {
        const localEthereumNetworkId = `0x${Number(localNetwork).toString(16)}`;

        const localEthereumNetwork =
          NETWORKS[localEthereumNetworkId] || defaultNetwork;

        setNetwork(localEthereumNetwork);
      }
    }

    getCurrentEthereumNetworkId();
  }, [localNetwork]);

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on('chainChanged', () => {
        history.push(`${location.pathname}?modal=false`);
        window.location.reload();
      });
    }
  }, [history, location.pathname]);

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', () => {
        history.push(`${location.pathname}?modal=false`);
        window.location.reload();
      });
    }
  }, [history, location.pathname]);

  return {
    network,
    networkConfig: networkConfig || defaultNetworkConfig,
    setNetwork: setLocalNetwork
  };
}

export default useNetwork;
