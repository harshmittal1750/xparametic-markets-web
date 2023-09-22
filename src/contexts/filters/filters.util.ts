import { environment, features, ui } from 'config';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { camelize } from 'humps';
import isEmpty from 'lodash/isEmpty';
import set from 'lodash/set';
import type { GetTournamentsData } from 'services/Polkamarkets/types';
import type { Network } from 'types/network';

import type { Filters, FiltersState, Option } from './filters.type';

dayjs.extend(utc);

const extraFilters = ui.filters.extra.filters;

const fantasyTokenTicker =
  features.fantasy.enabled && environment.FEATURE_FANTASY_TOKEN_TICKER
    ? environment.FEATURE_FANTASY_TOKEN_TICKER
    : undefined;

const defaultRangeOptions: Option[] = [
  { label: 'Any', value: 'any' },
  {
    label: fantasyTokenTicker ? `Under 10 ${fantasyTokenTicker}` : 'Under €10',
    value: '0-10'
  },
  {
    label: fantasyTokenTicker
      ? `10 ${fantasyTokenTicker} - 100 ${fantasyTokenTicker}`
      : '€10 - €100',
    value: '10-100'
  },
  {
    label: fantasyTokenTicker
      ? `100 ${fantasyTokenTicker} - 1000 ${fantasyTokenTicker}`
      : '€100 - €1000',
    value: '100-1000'
  },
  {
    label: fantasyTokenTicker
      ? `Over 1000 ${fantasyTokenTicker}`
      : 'Over €1000',
    value: '1000-'
  }
];

const defaultDateRangeOptions: Option[] = [
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

const defaultCategoriesOptions: Option[] = [
  {
    label: 'Society',
    value: 'Society'
  },
  {
    label: 'Economy/Finance',
    value: 'Economy/Finance'
  },
  {
    label: 'Politics',
    value: 'Politics'
  },
  {
    label: 'Entertainment/Arts',
    value: 'Entertainment/Arts'
  },
  {
    label: 'Sports',
    value: 'Sports'
  },
  {
    label: 'Other',
    value: 'Other'
  }
];

const categoriesOptionsFromEnvironment = ui.filters.categories.options?.map(
  category => ({
    label: category,
    value: category
  })
);

const filters: Filters = {
  toggles: {
    favorites: {
      title: 'Favorites',
      enabled: ui.filters.favorites.enabled
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
      multiple: true,
      enabled: ui.filters.states.enabled
    },
    networks: {
      title: 'Network',
      options: [],
      multiple: true,
      enabled: features.regular.enabled
    },
    tokens: {
      title: 'Token',
      options: [
        ...ui.filters.tokens.map(token => ({
          label: token,
          value: token
        })),
        {
          label: 'Other',
          value: 'other'
        }
      ],
      multiple: true,
      enabled: features.regular.enabled
    },
    volume: {
      title: 'Volume',
      options: defaultRangeOptions,
      multiple: false,
      enabled: ui.filters.volume.enabled
    },
    liquidity: {
      title: 'Liquidity',
      options: defaultRangeOptions,
      multiple: false,
      enabled: features.regular.enabled
    },
    endDate: {
      title: 'End Date',
      options: [
        ...defaultDateRangeOptions,
        {
          label: 'Custom',
          value: 'custom'
        }
      ],
      multiple: false,
      enabled: ui.filters.endDate.enabled
    },
    categories: {
      title: 'Category',
      options: categoriesOptionsFromEnvironment || defaultCategoriesOptions,
      multiple: true,
      enabled: ui.filters.categories.enabled
    },
    tournaments: {
      title: 'Tournament',
      options: [],
      multiple: true,
      enabled: ui.filters.tournaments.enabled
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

function addTournaments(tournaments: GetTournamentsData | undefined): Filters {
  const tournamentsOptions =
    tournaments?.map(tournament => ({
      label: tournament.title,
      value: `${tournament.networkId}${
        tournament.markets
          ? `,${tournament.markets.map(market => market.id).join(',')}`
          : ''
      }`
    })) || [];

  return set(filters, 'dropdowns.tournaments.options', tournamentsOptions);
}

const dropdownsKeys = Object.keys(filters.dropdowns);

function sanitizeFilterKey(key: string) {
  return camelize(key.replace(/[^\w ]/g, ''));
}

function addExtraFilters() {
  if (isEmpty(extraFilters)) return filters;

  const extraFiltersOptions = {};

  extraFilters
    .filter(filter => !dropdownsKeys.includes(filter.name))
    .forEach(filter => {
      extraFiltersOptions[`${sanitizeFilterKey(filter.name)}`] = {
        title: filter.name,
        options: filter.values.map(option => ({
          label: option,
          value: option.toLowerCase()
        })),
        multiple: filter.multiple,
        enabled: true
      };
    });

  return set(filters, 'dropdowns', {
    ...filters.dropdowns,
    ...extraFiltersOptions
  });
}

const filtersInitialState: FiltersState = {
  toggles: {
    favorites: false
  },
  dropdowns: {
    states: ['open'],
    networks: [],
    tokens: [],
    volume: 'any',
    liquidity: 'any',
    endDate: 'any',
    categories: [],
    tournaments: [],
    ...extraFilters.reduce((acc, filter) => {
      acc[`${sanitizeFilterKey(filter.name)}`] = filter.multiple
        ? []
        : filter.values[0];
      return acc;
    }, {})
  }
};

export {
  filters,
  addNetworks,
  addTournaments,
  addExtraFilters,
  filtersInitialState,
  sanitizeFilterKey
};
