import set from 'lodash/set';
import type { Network } from 'types/network';

import { FiltersState } from './filters.type';

const filtersInitialState: FiltersState = {
  favorites: {
    checked: false
  },
  dropdowns: {
    state: {
      title: 'Market State',
      type: 'checkbox',
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
    },
    volume: {
      title: 'Market Volume',
      type: 'radio',
      options: [
        { label: 'Any', value: 'any', selected: true },
        {
          label: 'Under $10',
          value: '0-10',
          selected: false
        },
        {
          label: '$10 - $100',
          value: '10-100',
          selected: false
        },
        {
          label: '$100 - $1000',
          value: '100-1000',
          selected: false
        },
        {
          label: 'Over $1000',
          value: '1000-',
          selected: false
        },
        {
          label: 'Custom',
          value: 'custom',
          selected: false
        }
      ]
    },
    liquidity: {
      title: 'Market Liquidity',
      type: 'radio',
      options: [
        { label: 'Any', value: 'any', selected: true },
        {
          label: 'Under $10',
          value: '0-10',
          selected: false
        },
        {
          label: '$10 - $100',
          value: '10-100',
          selected: false
        },
        {
          label: '$100 - $1000',
          value: '100-1000',
          selected: false
        },
        {
          label: 'Over $1000',
          value: '1000-',
          selected: false
        },
        {
          label: 'Custom',
          value: 'custom',
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
        type: 'checkbox' as const,
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
