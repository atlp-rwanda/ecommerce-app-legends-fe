import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { URL } from '../../../views/auths/Login';

const initialState = {
  vendors: [],
  status: 'iddle',
  error: null,
};

export const fetchVendors = createAsyncThunk('shop/vendors', async () => {
  try {
    const response = await axios.get(`${URL}/api/v1/vendors`);
    return response.data.data;
  } catch (error) {
    return error.message;
  }
});
const Vendorslice = createSlice({
  name: 'Vendors',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchVendors.pending, (state) => {
        return {
          ...state,
          status: 'loading',
        };
      })
      .addCase(fetchVendors.fulfilled, (state, action) => {
        return {
          ...state,
          status: 'succeeded',
          vendors: action.payload,
        };
      })
      .addCase(fetchVendors.rejected, (state, action) => {
        return {
          ...state,
          status: 'failed',
          error: action.error.message,
        };
      });
  },
});
export const fetchVendorsStatus = (state) => state.Vendors.status;
export const selectVendors = (state) => state.Vendors.vendors;
export default Vendorslice.reducer;
