import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { URL } from '../../../views/auths/Login';

const initialState = {
  users: [],
  status: 'iddle',
  error: null,
  message: '',
};
const token = JSON.parse(localStorage.getItem('token'));

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  try {
    const response = await axios.get(`${URL}/api/admin/users`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    return { error: error.message };
  }
});
export const updateUserById = createAsyncThunk(
  'users/updateUser',
  async (payload) => {
    const { id, roleId } = payload;
    try {
      document.body.style.overflow = 'hidden';
      const response = await axios.patch(
        `${URL}/api/v1/roles/update`,
        {
          id,
          role: roleId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response;
    } catch (error) {
      return { error: error.message };
    }
  }
);
const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        return {
          ...state,
          status: 'loading',
        };
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        return {
          ...state,
          status: 'succeeded',
          users: action.payload.data,
        };
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        return {
          ...state,
          status: 'failed',
          error: action.error.message,
        };
      })
      .addCase(updateUserById.pending, (state) => {
        return {
          ...state,
          status: 'loading',
        };
      })
      .addCase(updateUserById.fulfilled, (state, action) => {
        const updatedUser = action.payload.data;
        console.log(updatedUser);
        return {
          ...state,
          status: 'succeeded',
          message: updatedUser.message,
          users: state.users.map((user) =>
            user.id === updatedUser.data.id
              ? { ...user, role: updatedUser.data.role }
              : user
          ),
        };
      });
  },
});

export const selectUsers = (state) => state.users.users;
export const fetchUsersStatus = (state) => state.users.status;
export const fetchUsersError = (state) => state.users.error;
export const selectUpdateMsg = (state) => state.users.message;
export default usersSlice.reducer;
