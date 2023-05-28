import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { URL } from '../../../views/auths/Login';

const initialState = {
  clients: [],
  status: 'iddle',
  error: null,
};
const token = JSON.parse(localStorage.getItem('token'));

export const fetchClients = createAsyncThunk(
  'client/fetchClients',
  async () => {
    try {
      const response = await axios.get(`${URL}/api/v1/vendor/customers`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      return error.message;
    }
  }
);
const clientlice = createSlice({
  name: 'client',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchClients.pending, (state) => {
        return {
          ...state,
          status: 'loading',
        };
      })
      .addCase(fetchClients.fulfilled, (state, action) => {
        return {
          ...state,
          status: 'succeeded',
          client: action.payload.data,
        };
      })
      .addCase(fetchClients.rejected, (state, action) => {
        return {
          ...state,
          status: 'failed',
          error: action.error.message,
        };
      });
  },
});
export const selectClient = (state) => state.client.clients;
export const fetchClientsStatus = (state) => state.client.status;
export default clientlice.reducer;
