import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { URL } from '../../../views/auths/Login';

const initialState = {
  shoppableProducts: [],
  status: 'iddle',
  error: null,
};

export const fetchShoppableProducts = createAsyncThunk(
  'shop/products',
  async () => {
    try {
      const response = await axios.get(`${URL}/api/v1/buyer/products`);
      return response.data.data;
    } catch (error) {
      return error.message;
    }
  }
);
const ShoppableProductSlice = createSlice({
  name: 'ShoppableProducts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchShoppableProducts.pending, (state) => {
        return {
          ...state,
          status: 'loading',
        };
      })
      .addCase(fetchShoppableProducts.fulfilled, (state, action) => {
        return {
          ...state,
          status: 'succeeded',
          shoppableProducts: action.payload.products,
        };
      })
      .addCase(fetchShoppableProducts.rejected, (state, action) => {
        return {
          ...state,
          status: 'failed',
          error: action.error.message,
        };
      });
  },
});
export const fetchShoppableProductsStatus = (state) =>
  state.ShoppableProducts.status;
export const selectProducts = (state) =>
  state.ShoppableProducts.shoppableProducts;
export default ShoppableProductSlice.reducer;
