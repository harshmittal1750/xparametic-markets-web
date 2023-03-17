import { createContext, useCallback, useMemo, useReducer } from 'react';

import { useNetworks } from 'contexts/networks';

import filtersReducer from './filters.reducer';
import {
  FiltersActions,
  FiltersContextState,
  UpdateTogglePayload,
  UpdateDropdownPayload
} from './filters.type';
import { addNetworks, filtersInitialState } from './filters.util';

const FiltersContext = createContext<FiltersContextState>(
  {} as FiltersContextState
);

function FiltersProvider({ children }) {
  const { networks } = useNetworks();

  const filtersWithNetworks = useMemo(() => addNetworks(networks), [networks]);

  const [filtersState, dispatch] = useReducer(
    filtersReducer,
    filtersInitialState
  );

  const updateToggle = useCallback(({ toggle, state }: UpdateTogglePayload) => {
    dispatch({
      type: FiltersActions.UPDATE_TOGGLE,
      payload: { toggle, state }
    });
  }, []);

  const updateDropdown = useCallback(
    ({ dropdown, state }: UpdateDropdownPayload) => {
      dispatch({
        type: FiltersActions.UPDATE_DROPDOWN,
        payload: { dropdown, state }
      });
    },
    []
  );

  return (
    <FiltersContext.Provider
      value={{
        filters: filtersWithNetworks,
        state: filtersState,
        controls: {
          updateToggle,
          updateDropdown
        }
      }}
    >
      {children}
    </FiltersContext.Provider>
  );
}

export { FiltersContext, FiltersProvider };
