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
      query: () => `products/7686e571-888c-4e8f-9cf0-7a042b61d60a`,
    }),
  }),
});

export const { useGetAllProductQuery } = productApi;
