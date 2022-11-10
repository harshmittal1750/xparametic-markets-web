import { FiltersState } from './filters.type';

const filtersInitialState: FiltersState = {
  verified: {
    checked: true
  },
  favorites: {
    checked: false
  },
  dropdowns: [
    {
      title: 'Country',
      options: [
        {
          title: 'Argentina',
          selected: false
        },
        {
          title: 'Australia',
          selected: false
        },
        {
          title: 'Belgium',
          selected: false
        },
        {
          title: 'Brazil',
          selected: false
        },
        {
          title: 'Cameroon',
          selected: false
        },
        {
          title: 'Canada',
          selected: false
        },
        {
          title: 'Costa Rica',
          selected: false
        },
        {
          title: 'Croatia',
          selected: false
        },
        {
          title: 'Denmark',
          selected: false
        },
        {
          title: 'England',
          selected: false
        },
        {
          title: 'France',
          selected: false
        },
        {
          title: 'Germany',
          selected: false
        },
        {
          title: 'Ghana',
          selected: false
        },
        {
          title: 'Iran',
          selected: false
        },
        {
          title: 'Japan',
          selected: false
        },
        {
          title: 'Mexico',
          selected: false
        },
        {
          title: 'Morocco',
          selected: false
        },
        {
          title: 'Netherlands',
          selected: false
        },
        {
          title: 'Poland',
          selected: false
        },
        {
          title: 'Portugal',
          selected: false
        },
        {
          title: 'Qatar',
          selected: false
        },
        {
          title: 'Saudi Arabia',
          selected: false
        },
        {
          title: 'Senegal',
          selected: false
        },
        { title: 'Serbia', selected: false },
        { title: 'South Korea', selected: false },
        { title: 'Spain', selected: false },
        { title: 'Switzerland', selected: false },
        { title: 'Tunisia', selected: false },
        { title: 'United States', selected: false },
        { title: 'Uruguay', selected: false },
        { title: 'Wales', selected: false }
      ]
    },
    {
      title: 'Stage',
      options: [
        {
          title: 'Group A',
          selected: false
        },
        {
          title: 'Group B',
          selected: false
        },
        {
          title: 'Group C',
          selected: false
        },
        {
          title: 'Group D',
          selected: false
        },
        {
          title: 'Group E',
          selected: false
        },
        {
          title: 'Group F',
          selected: false
        },
        {
          title: 'Group G',
          selected: false
        },
        {
          title: 'Group H',
          selected: false
        },
        {
          title: 'Round of 16',
          selected: false
        },
        {
          title: 'Quarter-finals',
          selected: false
        },
        {
          title: 'Semi-finals',
          selected: false
        },
        {
          title: 'Final',
          selected: false
        }
      ]
    }
  ]
};

function createDepthPaths(filtersState: FiltersState): FiltersState {
  return {
    ...filtersState,
    dropdowns: filtersState.dropdowns.map((dropdown, dropdownIndex) => {
      return {
        ...dropdown,
        options: dropdown.options.map((option, optionIndex) => {
          return {
            ...option,
            path: `[${dropdownIndex}].options[${optionIndex}].selected`
          };
        })
      };
    })
  };
}

export { filtersInitialState, createDepthPaths };
