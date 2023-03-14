import set from 'lodash/set';
import type { Network } from 'types/network';

import { Filters, FiltersState } from './filters.type';

const defaultRangeOptions = [
  { label: 'Any', value: 'any' },
  {
    label: 'Under $10',
    value: '0-10'
  },
  {
    label: '$10 - $100',
    value: '10-100'
  },
  {
    label: '$100 - $1000',
    value: '100-1000'
  },
  {
    label: 'Over $1000',
    value: '1000-'
  }
];

const filters: Filters = {
  toggles: {
    favorites: {
      title: 'Favorites'
    }
  },
  dropdowns: {
    states: {
      title: 'Market State',
      options: [
        {
          label: 'Open',
          value: 'open'
        },
        {
          label: 'Closed',
          value: 'closed'
        },
        {
          label: 'Resolved',
          value: 'resolved'
        }
      ],
      multiple: true
    },
    networks: {
      title: 'Market Network',
      options: [],
      multiple: true
    },
    volume: {
      title: 'Market Volume',
      options: defaultRangeOptions,
      multiple: false
    },
    liquidity: {
      title: 'Market Liquidity',
      options: defaultRangeOptions,
      multiple: false
    }
  }
};

function addNetworks(networks: Network[]): Filters {
  const networksOptions = networks.map(network => ({
    label: network.name,
    value: network.id
  }));

  return set(filters, 'dropdowns.networks.options', networksOptions);
}

const filtersInitialState: FiltersState = {
  toggles: {
    favorites: false
  },
  dropdowns: {
    states: [],
    networks: [],
    volume: 'any',
    liquidity: 'any'
  }
};

export { filters, addNetworks, filtersInitialState };
