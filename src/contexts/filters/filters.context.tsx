import { createContext, useCallback, useMemo, useReducer } from 'react';

import { useNetworks } from 'contexts/networks';

import filtersReducer, { FiltersActions } from './filters.reducer';
import { FiltersContextState, Option } from './filters.type';
import {
  addNetworks,
  createDepthPaths,
  filtersInitialState
} from './filters.util';

const FiltersContext = createContext<FiltersContextState>(
  {} as FiltersContextState
);

function FiltersProvider({ children }) {
  const { networks } = useNetworks();

  const filtersInitialStateWithNetworks = useMemo(
    () => addNetworks(filtersInitialState, networks),
    [networks]
  );

  const filtersInitialStateWithDepthPaths = useMemo(
    () => createDepthPaths(filtersInitialStateWithNetworks),
    [filtersInitialStateWithNetworks]
  );

  const [state, dispatch] = useReducer(
    filtersReducer,
    filtersInitialStateWithDepthPaths
  );

  const toggleFavorites = useCallback(() => {
    dispatch({ type: FiltersActions.TOGGLE_FAVORITES });
  }, []);

  const toggleDropdownOption = useCallback(
    (value: { path: Option['path']; selected: Option['selected'] }) => {
      const { path, selected } = value;
      if (path) {
        dispatch({
          type: FiltersActions.TOGGLE_DROPDOWN_OPTION,
          payload: { path, selected }
        });
      }
    },
    []
  );

  return (
    <FiltersContext.Provider
      value={{
        state,
        controls: {
          toggleFavorites,
          toggleDropdownOption
        }
      }}
    >
      {children}
    </FiltersContext.Provider>
  );
}

export { FiltersContext, FiltersProvider };
