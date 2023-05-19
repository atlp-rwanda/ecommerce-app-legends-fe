/* eslint-disable no-param-reassign */
// adminOrders.jsx

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { client } from '../../API/client';

// get all orders
export const fetchAdminOrders = createAsyncThunk(
  'adminOrders/fetchAdminOrders',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await client.get('/api/v1/admin/orders');

      return data;
    } catch (error) {
      rejectWithValue(error.response.data);
    }
  }
);

// update Users
export const adminChangeOrderStatus = createAsyncThunk(
  'adminOrders/adminChangeOrderStatus',

  async (order, { rejectWithValue }) => {
    try {
      const { data } = await client.put(
        `/api/v1/orders/${order.id}`,
        {
          status: order.status.toLowerCase(),
        },
        {
          headers: {
            'Content-Type': 'application/json', // Set the dynamic content type here
          },
        }
      );
      return data;
    } catch (error) {
      rejectWithValue(error.response.data);
    }
  }
);

const adminOrdersSlice = createSlice({
  name: 'adminOrders',
  initialState: {
    adminOrders: { orders: [], status: 'idle', error: null, message: '' },
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Load orders
      .addCase(fetchAdminOrders.pending, (state) => {
        state.adminOrders.status = 'loading';
      })
      .addCase(fetchAdminOrders.fulfilled, (state, { payload }) => {
        state.adminOrders = {
          orders: payload,
          status: 'succeeded',
        };
      })
      .addCase(fetchAdminOrders.rejected, (state, { error }) => {
        state.adminOrders = {
          ...state.adminOrders,
          status: 'failed',
          error: error.message,
        };
      })
      // update product
      .addCase(adminChangeOrderStatus.pending, (state) => {
        state.adminOrders = { ...state.adminOrders, status: 'loading' };
      })
      .addCase(adminChangeOrderStatus.fulfilled, (state, { payload }) => {
        state.adminOrders = {
          ...state.adminOrders,
          status: 'succeeded',
          message: payload.message,
        };
      })
      .addCase(adminChangeOrderStatus.rejected, (state, { error }) => {
        state.adminOrders = {
          ...state.adminOrders,
          status: 'failed',
          error: error.message,
        };
      });
  },
});

export default adminOrdersSlice.reducer;
