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
      query: () => `products/13b80432-9f63-4d49-ab01-6c903efeea3f`,
    }),
  }),
});

export const { useGetAllProductQuery } = productApi;
