import { createContext, useCallback, useMemo, useReducer } from 'react';

import filtersReducer, { FiltersActions } from './filters.reducer';
import { FiltersContextState, Option } from './filters.type';
import { createDepthPaths, filtersInitialState } from './filters.util';

const FiltersContext = createContext<FiltersContextState>(
  {} as FiltersContextState
);

function FiltersProvider({ children }) {
  const filtersInitialStateWithDepthPaths = useMemo(
    () => createDepthPaths(filtersInitialState),
    []
  );

  const [state, dispatch] = useReducer(
    filtersReducer,
    filtersInitialStateWithDepthPaths
  );

  const toggleVerified = useCallback(() => {
    dispatch({ type: FiltersActions.TOGGLE_VERIFIED });
  }, []);

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
          toggleVerified,
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
