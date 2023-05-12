/* eslint-disable no-param-reassign */
// productsSlice.jsx

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { client } from '../../API/client';

export const fetchProducts = createAsyncThunk(
  'langingProducts/fetchProducts',
  async (arg, { rejectWithValue }) => {
    try {
      const { data } = await client.get('/api/v1/buyer/products', { arg });
      return data;
    } catch (error) {
      rejectWithValue(error.response.data);
    }
  }
);

export const searchProducts = createAsyncThunk(
  'langingProducts/searchProducts',
  async (arg, { rejectWithValue }) => {
    try {
      const { data } = await client.get('/api/v1/product', { arg });

      return data;
    } catch (error) {
      rejectWithValue(error.response.data);
    }
  }
);

const productsSlice = createSlice({
  name: 'langingProducts',
  initialState: {
    allProducts: { products: [], status: 'idle', error: null },
    searchedProducts: {
      products: [],
      status: 'idle',
      error: null,
    },
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.allProducts.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, { payload }) => {
        state.allProducts = { products: payload, status: 'succeeded' };
      })
      .addCase(fetchProducts.rejected, (state, { payload, error }) => {
        state.allProducts = {
          products: payload,
          status: 'failed',
          error: error.message,
        };
      })
      .addCase(searchProducts.pending, (state) => {
        state.searchedProducts.status = 'loading';
      })
      .addCase(searchProducts.fulfilled, (state, { payload }) => {
        state.searchedProducts = {
          products: payload,
          status: 'succeeded',
        };
      })
      .addCase(searchProducts.rejected, (state, { payload, error }) => {
        state.searchedProducts = {
          products: payload,
          status: 'failed',
          error: error.message,
        };
      });
  },
});

export default productsSlice.reducer;
