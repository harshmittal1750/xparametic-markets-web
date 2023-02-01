export type Switch = {
  checked: boolean;
};

export type Option = {
  label: string;
  value: string;
  selected: boolean;
  path?: string;
};

export type Dropdown = {
  title: string;
  options: Option[];
};

export type FiltersState = {
  favorites: Switch;
  dropdowns: { [key: string]: Dropdown };
};

export type FiltersContextState = {
  state: FiltersState;
  controls: {
    toggleFavorites: () => void;
    toggleDropdownOption: (value: {
      path: Option['path'];
      selected: Option['selected'];
    }) => void;
  };
  selected: {
    favorites: boolean;
    dropdowns: {
      networks: Option['value'][];
      states: Option['value'][];
    };
  };
};
