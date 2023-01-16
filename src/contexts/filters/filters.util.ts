import set from 'lodash/set';

import { Network } from 'hooks/useNetwork/networks';

import { FiltersState } from './filters.type';

const filtersInitialState: FiltersState = {
  favorites: {
    checked: false
  },
  dropdowns: {
    state: {
      title: 'Market State',
      options: [
        {
          label: 'Open',
          value: 'open',
          selected: false
        },
        {
          label: 'Closed',
          value: 'closed',
          selected: false
        },
        {
          label: 'Resolved',
          value: 'resolved',
          selected: false
        }
      ]
    }
  }
};

function addNetworks(filtersState: FiltersState, networks: Network[]) {
  return {
    ...filtersState,
    dropdowns: {
      ...filtersState.dropdowns,
      network: {
        title: 'Market Network',
        options: [
          ...networks.map(network => {
            return {
              label: network.name,
              value: network.id,
              selected: false
            };
          })
        ]
      }
    }
  };
}

function createDepthPaths(filtersState: FiltersState): FiltersState {
  const stateWithDepthPaths = filtersState;

  Object.entries(stateWithDepthPaths.dropdowns).forEach(([key, dropdown]) => {
    dropdown.options.forEach((_option, index) => {
      const basePath = `${key}.options[${index}]`;
      set(
        stateWithDepthPaths,
        `dropdowns.${basePath}.path`,
        `${basePath}.selected`
      );
    });
  });

  return stateWithDepthPaths;
}

export { filtersInitialState, addNetworks, createDepthPaths };
