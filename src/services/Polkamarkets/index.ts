import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { environment } from 'config';

import {
  GetMarketBySlugArgs,
  GetMarketBySlugData,
  GetMarketByStateArgs,
  GetMarketByStateData
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
    })
  })
});

export default polkamarketsApi;

export const { useGetMarketBySlugQuery, useGetMarketsByStateQuery } =
  polkamarketsApi;
