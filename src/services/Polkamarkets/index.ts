import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { environment } from 'config';

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
  GetPortfolioByAddressData
} from './types';

const polkamarketsApi = createApi({
  reducerPath: 'polkamarketsApi',
  baseQuery: fetchBaseQuery({ baseUrl: environment.POLKAMARKETS_API_URL }),
  endpoints: builder => ({
    getMarketBySlug: builder.query<GetMarketBySlugData, GetMarketBySlugArgs>({
      query: ({ slug }) => `/markets/${slug}`
    }),
    getMarketsByState: builder.query<
      GetMarketByStateData,
      GetMarketByStateArgs
    >({
      query: ({ state }) => `/markets?state=${state}`
    }),
    getMarketsByIds: builder.query<GetMarketsByIdsData, GetMarketsByIdsArgs>({
      query: ({ ids }) => `/markets?id=${ids.join(',')}`
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
      })
    }),
    getPortfolioByAddress: builder.query<
      GetPortfolioByAddressData,
      GetPortfolioByAddressArgs
    >({
      query: ({ address }) => `/portfolios/${address}`
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
  useGetPortfolioByAddressQuery
} = polkamarketsApi;
