/* eslint-disable no-param-reassign */
// productsSlice.jsx

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { client } from '../../API/client';

// get all products
export const fetchSellerCoupons = createAsyncThunk(
  'sellerCoupons/fetchSellerCoupons',
  async (arg, { rejectWithValue }) => {
    try {
      //   const user = useSelector((state) => state.currentUser);
      const { data } = await client.get('/api/v1/coupons/all', { arg });
      return data;
    } catch (error) {
      rejectWithValue(error.response.data);
    }
  }
);

// search products
export const searchSellerProducts = createAsyncThunk(
  'sellerCoupons/searchSellerProducts',

  async (arg, { rejectWithValue }) => {
    try {
      const { data } = await client.get('/api/v1/seller/products', { arg });
      return data;
    } catch (error) {
      rejectWithValue(error.response.data);
    }
  }
);

// create coupon
export const createSellerCoupon = createAsyncThunk(
  'sellerCoupons/createSellerCoupon',

  async (coupon, { rejectWithValue }) => {
    try {
      console.log(product);
      const { data } = await client.post(`/api/v1/coupons/add`, coupon.body, {
        headers: {
          'Content-type': 'application/json',
        },
      });
      return data;
    } catch (error) {
      rejectWithValue(error.response.data);
    }
  }
);

const sellersCouponSlice = createSlice({
  name: 'sellerCoupons',
  initialState: {
    sellerCoupons: { coupons: [], status: 'idle', error: null },
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Load products
      .addCase(fetchSellerCoupons.pending, (state) => {
        state.sellerCoupons.status = 'loading';
      })
      .addCase(fetchSellerCoupons.fulfilled, (state, { payload }) => {
        state.sellerCoupons = { coupons: payload, status: 'succeeded' };
      })
      .addCase(fetchSellerCoupons.rejected, (state, { payload, error }) => {
        state.sellerCoupons = {
          coupons: payload,
          status: 'failed',
          error: error.message,
        };
      })
      // create coupon
      .addCase(createSellerCoupon.pending, (state) => {
        state.sellerCoupons.status = 'loading';
      })
      .addCase(createSellerCoupon.fulfilled, (state, { payload }) => {
        state.sellerCoupons = {
          status: 'succeeded',
          message: payload.message,
        };
      })
      .addCase(createSellerCoupon.rejected, (state, { error }) => {
        state.sellerCoupons = {
          ...state.sellerCoupons,
          status: 'failed',
          error: error.message,
        };
      });
  },
});

export default sellersProductsSlice.reducer;
