import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

const URL = `https://ecommerce-app-legends-bn-production.up.railway.app`;

const token = JSON.parse(localStorage.getItem('token'));

export const postRating = createAsyncThunk(
  'rating/addRating',
  async (review, { rejectWithValue }) => {
    const response = await fetch(`${URL}/api/v1/product/rating`, {
      method: 'POST',
      body: JSON.stringify({
        rating: review.rating,
        comment: review.comment || '',
        productId: review.id,
      }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
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
const RatingSlice = createSlice({
  name: 'rating',
  initialState: {
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(postRating.pending, (state) => {
        return {
          ...state,
          status: 'loading',
        };
      })
      .addCase(postRating.fulfilled, (state) => {
        return {
          ...state,
          status: 'succeeded',
        };
      })
      .addCase(postRating.rejected, (state, action) => {
        return {
          ...state,
          status: 'failed',
          error: action.error.message,
        };
      });
  },
});
export default RatingSlice.reducer;
