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

  function pickSelectedOptions(options: Option[]) {
    return options
      .filter(option => option.selected)
      .map(option => option.value);
  }

  const selectedOptions = useMemo(() => {
    const { dropdowns } = state;
    return {
      favorites: state.favorites.checked,
      dropdowns: {
        networks: pickSelectedOptions(dropdowns.network.options),
        countries: pickSelectedOptions(dropdowns.country.options),
        stages: pickSelectedOptions(dropdowns.stage.options),
        states: pickSelectedOptions(dropdowns.state.options)
      }
    };
  }, [state]);

  return (
    <FiltersContext.Provider
      value={{
        state,
        controls: {
          toggleFavorites,
          toggleDropdownOption
        },
        selected: selectedOptions
      }}
    >
      {children}
    </FiltersContext.Provider>
  );
}

export { FiltersContext, FiltersProvider };
