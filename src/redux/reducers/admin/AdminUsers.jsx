/* eslint-disable no-param-reassign */
// adminUsers.jsx

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { client } from '../../API/client';

// get all Users
export const fetchAdminUsers = createAsyncThunk(
  'adminUsers/fetchAdminUsers',
  async ({ rejectWithValue }) => {
    try {
      const { data } = await client.get('/api/admin/users');
      return data;
    } catch (error) {
      rejectWithValue(error.response.data);
    }
  }
);

// update Users
export const adminEnableUserStatus = createAsyncThunk(
  'adminUsers/adminEnableUserStatus',

  async (id, { rejectWithValue }) => {
    try {
      console.log(id);
      const { data } = await client.put(`/api/v1/users/${id}/enable`, id);
      return data;
    } catch (error) {
      rejectWithValue(error.response.data);
    }
  }
);

export const adminDisableUserStatus = createAsyncThunk(
  'adminUsers/adminDisableUserStatus',

  async (id, { rejectWithValue }) => {
    try {
      console.log(id);
      const { data } = await client.put(`/api/v1/users/${id}/disable`, id);
      return data;
    } catch (error) {
      rejectWithValue(error.response.data);
    }
  }
);

const adminUsersSlice = createSlice({
  name: 'adminUsers',
  initialState: {
    sellerProducts: { products: [], status: 'idle', error: null },
    searchedProducts: {
      products: [],
      status: 'idle',
      error: null,
      message: '',
    },
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Load products
      .addCase(fetchSellerProducts.pending, (state) => {
        state.sellerProducts.status = 'loading';
      })
      .addCase(fetchSellerProducts.fulfilled, (state, { payload }) => {
        state.sellerProducts = { products: payload, status: 'succeeded' };
      })
      .addCase(fetchSellerProducts.rejected, (state, { payload, error }) => {
        state.sellerProducts = {
          products: payload,
          status: 'failed',
          error: error.message,
        };
      })
      // Delete product
      .addCase(deleteSellerProducts.pending, (state) => {
        state.sellerProducts.status = 'loading';
      })
      .addCase(deleteSellerProducts.fulfilled, (state, { payload }) => {
        state.sellerProducts = {
          status: 'succeeded',
          message: payload.message,
        };
      })
      .addCase(deleteSellerProducts.rejected, (state, { error }) => {
        state.sellerProducts = {
          ...state.sellerProducts,
          status: 'failed',
          error: error.message,
        };
      })
      // update product
      .addCase(updateSellerProducts.pending, (state) => {
        state.sellerProducts.status = 'loading';
      })
      .addCase(updateSellerProducts.fulfilled, (state, { payload }) => {
        state.sellerProducts = {
          status: 'succeeded',
          message: payload.message,
        };
      })
      .addCase(updateSellerProducts.rejected, (state, { error }) => {
        state.sellerProducts = {
          ...state.sellerProducts,
          status: 'failed',
          error: error.message,
        };
      })
      // update product variations
      .addCase(updateProductAttribute.pending, (state) => {
        state.sellerProducts.status = 'loading';
      })
      .addCase(updateProductAttribute.fulfilled, (state, { payload }) => {
        state.sellerProducts = {
          ...state.sellerProducts,
          status: 'succeeded',
          message: payload.message,
        };
      })
      .addCase(updateProductAttribute.rejected, (state, { error }) => {
        state.sellerProducts = {
          ...state.sellerProducts,
          status: 'failed',
          error: error.message,
        };
      })
      // search product
      .addCase(searchSellerProducts.pending, (state) => {
        state.searchedProducts.status = 'loading';
      })
      .addCase(searchSellerProducts.fulfilled, (state, { payload }) => {
        state.searchedProducts = {
          products: payload,
          status: 'succeeded',
        };
      })
      .addCase(searchSellerProducts.rejected, (state, { payload, error }) => {
        state.searchedProducts = {
          products: payload,
          status: 'failed',
          error: error.message,
        };
      });
  },
});

export default sellersProductsSlice.reducer;
