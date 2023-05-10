import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const token = JSON.parse(localStorage.getItem('token'));

export const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery: fetchBaseQuery({
    baseUrl:
      'https://ecommerce-app-legends-bn-production.up.railway.app/api/v1/',
    prepareHeaders: (headers) => {
      headers.set('Authorization', `Bearer ${token}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getAllProduct: builder.query({
      query: () => `products/359fe4a2-8ea0-411d-8971-a39e5350dc0e`,
    }),
  }),
});

export const { useGetAllProductQuery } = productApi;
