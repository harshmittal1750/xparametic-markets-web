import set from 'lodash/set';

import { Network } from 'hooks/useNetwork/networks';

import { FiltersState } from './filters.type';

const filtersInitialState: FiltersState = {
  favorites: {
    checked: false
  },
  dropdowns: {
    country: {
      title: 'Country',
      options: [
        {
          label: 'Argentina',
          value: 'Argentina',
          selected: false
        },
        {
          label: 'Australia',
          value: 'Australia',
          selected: false
        },
        {
          label: 'Belgium',
          value: 'Belgium',
          selected: false
        },
        {
          label: 'Brazil',
          value: 'Brazil',
          selected: false
        },
        {
          label: 'Cameroon',
          value: 'Cameroon',
          selected: false
        },
        {
          label: 'Canada',
          value: 'Canada',
          selected: false
        },
        {
          label: 'Costa Rica',
          value: 'Costa Rica',
          selected: false
        },
        {
          label: 'Croatia',
          value: 'Croatia',
          selected: false
        },
        {
          label: 'Denmark',
          value: 'Denmark',
          selected: false
        },
        {
          label: 'Ecuador',
          value: 'Ecuador',
          selected: false
        },
        {
          label: 'England',
          value: 'England',
          selected: false
        },
        {
          label: 'France',
          value: 'France',
          selected: false
        },
        {
          label: 'Germany',
          value: 'Germany',
          selected: false
        },
        {
          label: 'Ghana',
          value: 'Ghana',
          selected: false
        },
        {
          label: 'Iran',
          value: 'Iran',
          selected: false
        },
        {
          label: 'Japan',
          value: 'Japan',
          selected: false
        },
        {
          label: 'Mexico',
          value: 'Mexico',
          selected: false
        },
        {
          label: 'Morocco',
          value: 'Morocco',
          selected: false
        },
        {
          label: 'Netherlands',
          value: 'Netherlands',
          selected: false
        },
        {
          label: 'Poland',
          value: 'Poland',
          selected: false
        },
        {
          label: 'Portugal',
          value: 'Portugal',
          selected: false
        },
        {
          label: 'Qatar',
          value: 'Qatar',
          selected: false
        },
        {
          label: 'Saudi Arabia',
          value: 'Saudi Arabia',
          selected: false
        },
        {
          label: 'Senegal',
          value: 'Senegal',
          selected: false
        },
        { label: 'Serbia', value: 'Serbia', selected: false },
        { label: 'South Korea', value: 'South Korea', selected: false },
        { label: 'Spain', value: 'Spain', selected: false },
        { label: 'Switzerland', value: 'Switzerland', selected: false },
        { label: 'Tunisia', value: 'Tunisia', selected: false },
        { label: 'United States', value: 'United States', selected: false },
        { label: 'Uruguay', value: 'Uruguay', selected: false },
        { label: 'Wales', value: 'Wales', selected: false }
      ]
    },
    stage: {
      title: 'Stage',
      options: [
        {
          label: 'Group A',
          value: 'Group A',
          selected: false
        },
        {
          label: 'Group B',
          value: 'Group B',
          selected: false
        },
        {
          label: 'Group C',
          value: 'Group C',
          selected: false
        },
        {
          label: 'Group D',
          value: 'Group D',
          selected: false
        },
        {
          label: 'Group E',
          value: 'Group E',
          selected: false
        },
        {
          label: 'Group F',
          value: 'Group F',
          selected: false
        },
        {
          label: 'Group G',
          value: 'Group G',
          selected: false
        },
        {
          label: 'Group H',
          value: 'Group H',
          selected: false
        },
        {
          label: 'Round of 16',
          value: 'Round of 16',
          selected: false
        },
        {
          label: 'Quarter-finals',
          value: 'Quarter-finals',
          selected: false
        },
        {
          label: 'Semi-finals',
          value: 'Semi-finals',
          selected: false
        },
        {
          label: 'Final',
          value: 'Final',
          selected: false
        }
      ]
    },
    state: {
      title: 'Market State',
      options: [
        {
          label: 'Open',
          value: 'open',
          selected: true
        },
        {
          label: 'Closed',
          value: 'closed',
          selected: true
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
