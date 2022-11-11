export type Switch = {
  checked: boolean;
};

export type Option = {
  title: string;
  selected: boolean;
  path?: string;
};

export type Dropdown = {
  title: string;
  options: Option[];
};

export type FiltersState = {
  verified: Switch;
  favorites: Switch;
  dropdowns: { [key: string]: Dropdown };
};

export type FiltersContextState = {
  state: FiltersState;
  controls: {
    toggleVerified: () => void;
    toggleFavorites: () => void;
    toggleDropdownOption: (value: {
      path: Option['path'];
      selected: Option['selected'];
    }) => void;
  };
};
