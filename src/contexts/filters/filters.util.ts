import dayjs from 'dayjs';
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

const defaultDateRangeOptions = [
  {
    label: 'Any',
    value: 'any'
  },
  {
    label: 'Ends today',
    value: `${dayjs().utc().startOf('day')}-${dayjs().utc().endOf('day')}`
  },
  {
    label: 'End this week',
    value: `${dayjs().utc().startOf('week')}-${dayjs().utc().endOf('week')}`
  },
  {
    label: 'End this month',
    value: `${dayjs().utc().startOf('month')}-${dayjs().utc().endOf('month')}`
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
      title: 'State',
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
      title: 'Network',
      options: [],
      multiple: true
    },
    volume: {
      title: 'Volume',
      options: defaultRangeOptions,
      multiple: false
    },
    liquidity: {
      title: 'Liquidity',
      options: defaultRangeOptions,
      multiple: false
    },
    endDate: {
      title: 'End Date',
      options: defaultDateRangeOptions,
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
    liquidity: 'any',
    endDate: 'any'
  }
};

export { filters, addNetworks, filtersInitialState };
