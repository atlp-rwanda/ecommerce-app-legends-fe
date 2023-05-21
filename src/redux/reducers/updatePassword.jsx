import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

const URL = `https://ecommerce-app-legends-bn-production.up.railway.app`;

const token = JSON.parse(localStorage.getItem('token'));

export const PsswdUpdate = createAsyncThunk(
  'updatePasswd/all',
  async (passwords, { rejectWithValue }) => {
    console.log(passwords);
    const response = await fetch(`${URL}/api/v1/users/password/update`, {
      method: 'PUT',
      body: JSON.stringify({
        existingPassword: passwords.xpassword,
        newPassword: passwords.npassword,
      }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    if (response.status !== 200) {
      toast.error(data.message, {
        theme: 'colored',
      });
      return rejectWithValue(data.message);
    }
    toast.success(data.message, {
      theme: 'colored',
    });
    return data;
  }
);
const UpdatePassword = createSlice({
  name: 'passwdUpdate',
  initialState: {
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(PsswdUpdate.pending, (state) => {
        return {
          ...state,
          status: 'loading',
        };
      })
      .addCase(PsswdUpdate.fulfilled, (state) => {
        return {
          ...state,
          status: 'succeeded',
        };
      })
      .addCase(PsswdUpdate.rejected, (state, action) => {
        return {
          ...state,
          status: 'failed',
          error: action.error.message,
        };
      });
  },
});
export default UpdatePassword.reducer;
