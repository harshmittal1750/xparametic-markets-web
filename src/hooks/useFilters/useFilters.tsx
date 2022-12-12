import { useContext } from 'react';

import isEmpty from 'lodash/isEmpty';

import { FiltersContext } from 'contexts/filters';

function useFilters() {
  const context = useContext(FiltersContext);

  if (isEmpty(context)) {
    throw new Error('useFilters must be used within a FiltersProvider');
  }
  return context;
}
export default useFilters;
