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
      query: () => `products/7934b0f6-1c3a-4402-9cf3-4b7b82498e58`,
    }),
  }),
});

export const { useGetAllProductQuery } = productApi;
