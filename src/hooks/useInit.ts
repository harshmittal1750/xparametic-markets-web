import { useCallback, useEffect, useReducer } from 'react';

import { getUserGeolocation } from 'services/Polkamarkets/user';

export enum InitActions {
  CHECKING = 'CHECKING',
  RESTRICTED = 'RESTRICTED',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}

export type InitState = {
  type: `${InitActions}`;
  message: string;
  fetch(): void;
};

type Reducer<S extends InitState = InitState> = (
  state: S,
  action:
    | { type: Exclude<`${InitActions}`, 'ERROR'> }
    | { type: InitActions.ERROR; message: string }
) => S;

const init = {
  type: InitActions.CHECKING,
  message: '',
  fetch() {}
};
const reducer: Reducer = (state, action) => {
  switch (action.type) {
    case InitActions.RESTRICTED:
      return {
        ...state,
        type: InitActions.RESTRICTED
      };
    case InitActions.CHECKING:
      return {
        ...state,
        type: InitActions.CHECKING
      };
    case InitActions.SUCCESS:
      return {
        ...state,
        type: InitActions.SUCCESS
      };
    case InitActions.ERROR:
      return {
        ...state,
        type: InitActions.ERROR,
        message: action.message
      };
    default:
      return state;
  }
};

/**
 * @typedef {Object} Init
 * @property {string} type The state type, may be 'checking' | 'restricted' | 'success' | 'error'
 * @property {string} message The state error message
 */

/**
 * Returns the state of initial operations berfore load the application
 *
 * @return {Init} Type and error message state
 */
export default function useInit() {
  const [state, dispatch] = useReducer(reducer, init);
  const handleRestrictedCountry = useCallback(async () => {
    dispatch({
      type: InitActions.CHECKING
    });

    try {
      const restrictedCountries =
        process.env.REACT_APP_RESTRICTED_COUNTRIES?.split(',');

      if (restrictedCountries?.length) {
        const userGeolocation = await getUserGeolocation();

        dispatch({
          type: restrictedCountries.includes(userGeolocation.data.countryCode)
            ? InitActions.RESTRICTED
            : InitActions.SUCCESS
        });
      }
    } catch (error) {
      dispatch({
        type: InitActions.ERROR,
        message:
          error instanceof Error
            ? error.message
            : 'An error has occurred while trying to start the app.'
      });
    }
  }, []);

  useEffect(() => {
    handleRestrictedCountry();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    ...state,
    fetch: handleRestrictedCountry
  };
}
