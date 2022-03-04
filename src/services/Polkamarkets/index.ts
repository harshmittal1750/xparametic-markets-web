import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { environment } from 'config';
import { camelizeKeys } from 'humps';

import {
  GetMarketBySlugArgs,
  GetMarketBySlugData,
  GetMarketByStateArgs,
  GetMarketByStateData,
  GetMarketsByIdsArgs,
  GetMarketsByIdsData,
  ReloadMarketBySlugArgs,
  ReloadMarketBySlugData,
  CreateMarketByIdArgs,
  CreateMarketByIdData,
  GetPortfolioByAddressArgs,
  GetPortfolioByAddressData,
  ReloadPortfolioByAddressArgs,
  ReloadPortfolioByAddressData,
  GetAchievementsArgs,
  GetAchievementsData
} from './types';

function camelize<T extends object>(response: T): T {
  return camelizeKeys(response) as T;
}

const polkamarketsApi = createApi({
  reducerPath: 'polkamarketsApi',
  baseQuery: fetchBaseQuery({ baseUrl: environment.POLKAMARKETS_API_URL }),
  endpoints: builder => ({
    getMarketBySlug: builder.query<GetMarketBySlugData, GetMarketBySlugArgs>({
      query: ({ slug }) => `/markets/${slug}`,
      transformResponse: (response: GetMarketBySlugData) => camelize(response)
    }),
    getMarketsByState: builder.query<
      GetMarketByStateData,
      GetMarketByStateArgs
    >({
      query: ({ state }) => `/markets?state=${state}`,
      transformResponse: (response: GetMarketByStateData) => camelize(response)
    }),
    getMarketsByIds: builder.query<GetMarketsByIdsData, GetMarketsByIdsArgs>({
      query: ({ ids }) => `/markets?id=${ids.join(',')}`,
      transformResponse: (response: GetMarketsByIdsData) => camelize(response)
    }),
    reloadMarketBySlug: builder.mutation<
      ReloadMarketBySlugData,
      ReloadMarketBySlugArgs
    >({
      query: ({ slug }) => ({
        url: `/markets/${slug}/reload`,
        method: 'POST'
      })
    }),
    createMarketById: builder.mutation<
      CreateMarketByIdData,
      CreateMarketByIdArgs
    >({
      query: ({ id }) => ({
        url: `/markets/`,
        method: 'POST',
        body: {
          id
        }
      }),
      transformResponse: (response: CreateMarketByIdData) => camelize(response)
    }),
    getPortfolioByAddress: builder.query<
      GetPortfolioByAddressData,
      GetPortfolioByAddressArgs
    >({
      query: ({ address }) => `/portfolios/${address}`,
      transformResponse: (response: GetPortfolioByAddressData) =>
        camelize(response)
    }),
    reloadPortfolioByAddress: builder.mutation<
      ReloadPortfolioByAddressData,
      ReloadPortfolioByAddressArgs
    >({
      query: ({ address }) => ({
        url: `/portfolios/${address}/reload`,
        method: 'POST'
      })
    }),
    getAchievements: builder.query<GetAchievementsData, GetAchievementsArgs>({
      query: ({ networkId }) => `/achievements?network_id=${networkId}`,
      transformResponse: (response: GetAchievementsData) => camelize(response)
    })
  })
});

export default polkamarketsApi;

export const {
  useGetMarketBySlugQuery,
  useGetMarketsByStateQuery,
  useGetMarketsByIdsQuery,
  useReloadMarketBySlugMutation,
  useCreateMarketByIdMutation,
  useGetPortfolioByAddressQuery,
  useReloadPortfolioByAddressMutation,
  useGetAchievementsQuery
} = polkamarketsApi;
