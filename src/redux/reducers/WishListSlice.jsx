import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

const token = JSON.parse(localStorage.getItem('token'));

export const addToWishList = createAsyncThunk(
  'wishlist/addToWishList',
  async (id, { rejectWithValue }) => {
    const response = await fetch(
      'https://ecommerce-app-legends-bn-production.up.railway.app/api/v1/product/wishlist',
      {
        method: 'POST',
        body: JSON.stringify({ productId: id }),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await response.json();
    if (response.status !== 201) {
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

export const viewWishList = createAsyncThunk(
  'wishlist/viewWishList',
  async () => {
    const response = await fetch(
      'https://ecommerce-app-legends-bn-production.up.railway.app/api/v1/product/wishlist',
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await response.json();
    return data;
  }
);
export const removeToWishList = createAsyncThunk(
  'wishlist/removeToWishList',
  async (id) => {
    const response = await fetch(
      `https://ecommerce-app-legends-bn-production.up.railway.app/api/v1/product/wishlist/${id}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await response.json();
    return data;
  }
);

const wishListSlice = createSlice({
  name: 'wishlist',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addToWishList.pending, (state) => {
        return {
          ...state,
          status: 'loading',
        };
      })
      .addCase(addToWishList.fulfilled, (state, action) => {
        return {
          ...state,
          status: 'succeeded',
          items: action.payload,
        };
      })
      .addCase(addToWishList.rejected, (state, action) => {
        return {
          ...state,
          status: 'failed',
          error: action.error.message,
        };
      })
      .addCase(viewWishList.pending, (state) => {
        return {
          ...state,
          status: 'loading',
        };
      })
      .addCase(viewWishList.fulfilled, (state, action) => {
        return {
          ...state,
          status: 'succeeded',
          items: action.payload,
        };
      })
      .addCase(viewWishList.rejected, (state, action) => {
        return {
          ...state,
          status: 'failed',
          error: action.error.message,
        };
      })
      .addCase(removeToWishList.pending, (state) => {
        return {
          ...state,
          status: 'loading',
        };
      })
      .addCase(removeToWishList.fulfilled, (state, action) => {
        return {
          ...state,
          status: 'succeeded',
          items: action.payload,
        };
      })
      .addCase(removeToWishList.rejected, (state, action) => {
        return {
          ...state,
          status: 'failed',
          error: action.error.message,
        };
      });
  },
});

export default wishListSlice.reducer;
