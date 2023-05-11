// Filters

export enum Toggles {
  FAVORITES = 'favorites'
}

export enum Dropdowns {
  STATES = 'states',
  NETWORKS = 'networks',
  VOLUME = 'volume',
  LIQUIDITY = 'liquidity',
  END_DATE = 'endDate'
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
  toggles: Record<Toggles, Toggle>;
  dropdowns: Record<Dropdowns, Dropdown>;
};

// State

export type ToggleState = boolean;
export type DropdownState = string;
export type DropdownMultipleState = string[];

export type FiltersState = {
  toggles: Record<Toggles, ToggleState>;
  dropdowns: Record<Dropdowns, DropdownState | DropdownMultipleState>;
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
