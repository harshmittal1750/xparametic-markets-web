/* eslint-disable import/prefer-default-export */
import { undefinedCountry } from 'helpers/location';
import { UserGeolocation } from 'models/user';

import api from './api';

async function getUserGeolocation() {
  const { REACT_APP_IP_API_KEY } = process.env;
  if (!REACT_APP_IP_API_KEY) return { data: undefinedCountry };

  const url = `https://pro.ip-api.com/json?key=${REACT_APP_IP_API_KEY}`;
  return api.get<UserGeolocation>(url, {
    params: {
      fields: 'country,countryCode'
    }
  });
}

export { getUserGeolocation };
