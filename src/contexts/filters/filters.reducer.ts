import { FiltersActions } from './filters.type';
import type { FiltersAction, FiltersState } from './filters.type';

function filtersReducer(
  state: FiltersState,
  action: FiltersAction
): FiltersState {
  switch (action.type) {
    case FiltersActions.UPDATE_TOGGLE:
      return {
        ...state,
        toggles: {
          ...state.toggles,
          [action.payload.toggle]: action.payload.state
        }
      };
    case FiltersActions.UPDATE_DROPDOWN:
      return {
        ...state,
        dropdowns: {
          ...state.dropdowns,
          [action.payload.dropdown]: action.payload.state
        }
      };
    default:
      return state;
  }
}

export default filtersReducer;
