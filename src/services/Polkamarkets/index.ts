import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { environment } from 'config';

const polkamarketsApi = createApi({
  reducerPath: 'polkamarketsApi',
  baseQuery: fetchBaseQuery({ baseUrl: environment.POLKAMARKETS_API_URL }),
  endpoints: builder => ({})
});

export default polkamarketsApi;
