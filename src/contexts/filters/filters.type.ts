// Filters

export enum Toggles {
  FAVORITES = 'favorites'
}

export enum Dropdowns {
  STATES = 'states',
  NETWORKS = 'networks',
  TOKENS = 'tokens',
  VOLUME = 'volume',
  LIQUIDITY = 'liquidity',
  END_DATE = 'endDate',
  CATEGORIES = 'categories',
  TOURNAMENTS = 'tournaments'
}

export type Toggle = {
  title: string;
  enabled: boolean;
};

export type Option = {
  label: string;
  value: string;
};

export type Dropdown = {
  title: string;
  options: Option[];
  multiple: boolean;
  enabled: boolean;
};

export type Filters = {
  toggles: Record<string, Toggle>;
  dropdowns: Record<string, Dropdown>;
};

// State

export type ToggleState = boolean;
export type DropdownState = string;
export type DropdownMultipleState = string[];

export type FiltersState = {
  toggles: Record<string, ToggleState>;
  dropdowns: Record<string, DropdownState | DropdownMultipleState>;
};

// Context

export type FiltersContextState = {
  filters: Filters;
  state: FiltersState;
  controls: {
    updateToggle: ({ toggle, state }: UpdateTogglePayload) => void;
    updateDropdown: ({ dropdown, state }: UpdateDropdownPayload) => void;
  };
};

// Reducer

export enum FiltersActions {
  UPDATE_TOGGLE = 'UPDATE_TOGGLE',
  UPDATE_DROPDOWN = 'UPDATE_DROPDOWN'
}

export type UpdateTogglePayload = {
  toggle: Toggles;
  state: ToggleState;
};

export type UpdateDropdownPayload = {
  dropdown: Dropdowns;
  state: DropdownState | DropdownMultipleState;
};

export type FiltersAction =
  | { type: FiltersActions.UPDATE_TOGGLE; payload: UpdateTogglePayload }
  | { type: FiltersActions.UPDATE_DROPDOWN; payload: UpdateDropdownPayload };
