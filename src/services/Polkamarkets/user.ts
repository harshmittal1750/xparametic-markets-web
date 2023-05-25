/* eslint-disable import/prefer-default-export */
import { UserGeolocation } from 'models/user';

import api, { polkamarketsApiUrl } from './api';

async function getUserGeolocation() {
  const { REACT_APP_IP_API_KEY } = process.env;
  const url = `https://pro.ip-api.com/json?key=${REACT_APP_IP_API_KEY}`;
  return api.get<UserGeolocation>(url, {
    params: {
      fields: 'country,countryCode'
    }
  });
}

async function updateSocialLoginInfo(
  authenticationToken: string,
  username: string,
  loginType: string,
  walletAddress: string,
  avatar: string,
  discordServers: any[]
) {
  const url = `${polkamarketsApiUrl}/users`;
  return api.put(
    url,
    {
      username,
      login_type: loginType,
      wallet_address: walletAddress,
      avatar,
      discord_servers: discordServers
    },
    {
      headers: {
        Authorization: `Bearer ${authenticationToken}`
      }
    }
  );
}

export { getUserGeolocation, updateSocialLoginInfo };
