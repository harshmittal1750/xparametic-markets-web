import { useContext } from 'react';

import isEmpty from 'lodash/isEmpty';

import { PolkamarketsServiceContext } from './usePolkamarketsService.context';

function usePolkamarketsService() {
  const context = useContext(PolkamarketsServiceContext);

  if (isEmpty(context)) {
    throw new Error(
      'usePolkamarketsService must be used within a PolkamarketsServiceProvider'
    );
  }
  return context.instance;
}

export default usePolkamarketsService;
