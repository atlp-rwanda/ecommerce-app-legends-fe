import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { client } from '../../API/client';

export const getCategories = createAsyncThunk(
  'navbar/categories',
  async (arg, { rejectWithValue }) => {
    try {
      const category = await client.get('/api/v1/category/all', { arg });
      return category.data;
    } catch (error) {
      rejectWithValue(error.message);
    }
  }
);
const categorySlice = createSlice({
  name: 'category',
  initialState: {
    categories: [],
    status: 'active',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCategories.pending, (state) => {
        return { ...state, status: 'loading' };
      })
      .addCase(getCategories.fulfilled, (state, payload) => {
        return { ...state, status: 'succeeded', categories: payload };
      })
      .addCase(getCategories.rejected, (state, action) => {
        return { state, status: 'failed', error: action.payload };
      });
  },
});
export default categorySlice.reducer;
