import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { URL } from '../../../views/auths/Login';

const initialState = {
  roles: [],
  status: 'iddle',
  error: null,
};
const token = JSON.parse(localStorage.getItem('token'));

export const fetchRoles = createAsyncThunk('roles/fetchRoles', async () => {
  try {
    const response = await axios.get(`${URL}/api/v1/roles`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    return error.message;
  }
});
const RoleSlice = createSlice({
  name: 'roles',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRoles.pending, (state) => {
        return {
          ...state,
          status: 'loading',
        };
      })
      .addCase(fetchRoles.fulfilled, (state, action) => {
        return {
          ...state,
          status: 'succeeded',
          roles: action.payload.data,
        };
      })
      .addCase(fetchRoles.rejected, (state, action) => {
        return {
          ...state,
          status: 'failed',
          error: action.error.message,
        };
      });
  },
});
export const selectRoles = (state) => {
  const { roles } = state.roles;
  if (!roles.length) {
    return [];
  }
  const result = Object.values(
    roles.reduce((acc, cur) => {
      const { name, id } = cur;
      if (name in acc) {
        acc[name].value1 += id;
      } else {
        acc[name] = { name, id };
      }
      return acc;
    }, {})
  );
  return result;
};

export const fetchRolesStatus = (state) => state.roles.status;
export default RoleSlice.reducer;
