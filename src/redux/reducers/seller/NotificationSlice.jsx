import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { URL } from '../../../views/auths/Login';

// GET ALL NOTIFICATIONS

export const fetchNotifications = createAsyncThunk(
  'notifications/fetchNotifications',
  async (id) => {
    try {
      const { data } = await axios.get(`${URL}/api/v1/unread/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      return data;
    } catch (error) {
      return error.message;
    }
  }
);

// MARK AS READ NOTIFICATION

export const markAsRead = createAsyncThunk(
  'notifications/markAsRead',
  async (id) => {
    try {
      const { data } = await axios.patch(`${URL}/api/v1/read/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      return data;
    } catch (error) {
      return error.message;
    }
  }
);

const notificationSlice = createSlice({
  name: 'notifications',
  initialState: {
    notifications: [],
    searchedNotifications: {
      notifications: [],
      status: 'idle',
      error: null,
      message: '',
      notificationCounter: 0,
    },
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // LOAD NOTIFICATIONS
      .addCase(fetchNotifications.pending, (state) => {
        return { ...state, status: 'loading' };
      })
      .addCase(fetchNotifications.fulfilled, (state, { payload }) => {
        return {
          ...state,
          notifications: payload.data,
          status: 'succeeded',
          notificationCounter: payload?.data?.length,
        };
      })
      .addCase(fetchNotifications.rejected, (state, action) => {
        return { ...state, status: 'failed', error: action.error };
      })

      .addCase(markAsRead.pending, (state) => {
        return { ...state, status: 'loading' };
      })
      .addCase(markAsRead.fulfilled, (state, { payload }) => {
        console.log(payload.data.length, 'payload from mark as read');
        return {
          ...state,
          notifications: payload.data,
          status: 'succeeded',
          notificationCounter: payload?.data?.length,
        };
      })
      .addCase(markAsRead.rejected, (state, action) => {
        return { ...state, status: 'failed', error: action.error };
      });
  },
});

export const selectNotifications = (state) => state.notifications.notifications;
export const selectNotificationCounter = (state) =>
  state.notifications.notificationCounter;

export default notificationSlice.reducer;
