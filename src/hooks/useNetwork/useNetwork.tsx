import { useContext } from 'react';

import isEmpty from 'lodash/isEmpty';

import { NetworkContext } from './useNetwork.context';

function useNetwork() {
  const context = useContext(NetworkContext);

  if (isEmpty(context)) {
    throw new Error('useNetwork must be used within a NetworkProvider');
  }
  return context;
}

export default useNetwork;
