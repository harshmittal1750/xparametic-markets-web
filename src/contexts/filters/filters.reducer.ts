import update from 'lodash/update';

import { FiltersState } from './filters.type';

export enum FiltersActions {
  TOGGLE_VERIFIED = 'TOGGLE_VERIFIED',
  TOGGLE_FAVORITES = 'TOGGLE_FAVORITES',
  TOGGLE_DROPDOWN_OPTION = 'TOGGLE_DROPDOWN_OPTION'
}

type ToggleDropdownOptionPayload = {
  path: string;
};

type FiltersAction =
  | { type: FiltersActions.TOGGLE_VERIFIED }
  | { type: FiltersActions.TOGGLE_FAVORITES }
  | {
      type: FiltersActions.TOGGLE_DROPDOWN_OPTION;
      payload: ToggleDropdownOptionPayload;
    };

function filtersReducer(
  state: FiltersState,
  action: FiltersAction
): FiltersState {
  switch (action.type) {
    case FiltersActions.TOGGLE_VERIFIED:
      return {
        ...state,
        verified: {
          checked: !state.verified.checked
        }
      };
    case FiltersActions.TOGGLE_FAVORITES:
      return {
        ...state,
        favorites: {
          checked: !state.favorites.checked
        }
      };
    case FiltersActions.TOGGLE_DROPDOWN_OPTION:
      return {
        ...state,
        dropdowns: update(
          state.dropdowns,
          action.payload.path,
          option => !option
        )
      };
    default:
      return state;
  }
}

export default filtersReducer;
