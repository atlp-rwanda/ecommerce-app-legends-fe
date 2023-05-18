import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const token = JSON.parse(localStorage.getItem('token'));

export const viewAllSellersProduct = createAsyncThunk(
  'seller/viewAllSellersProduct',
  async () => {
    // const token = thunkAPI.getState().auth.token;
    if (!token) {
      throw new Error(
        'A valid token is required to view all sellers products.'
      );
    }

    const response = await fetch(
      `https://ecommerce-app-legends-bn-production.up.railway.app/api/v1/seller/products`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('The provided token is invalid or has expired.');
      }
      throw new Error('Failed to fetch all sellers products data.');
    }

    const data = await response.json();
    return data;
  }
);

export const viewSingleSellersProduct = createAsyncThunk(
  'seller/viewSingleSellersProduct',
  async (id) => {
    const response = await fetch(
      `https://ecommerce-app-legends-bn-production.up.railway.app/api/v1/products/${id}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    const data = await response.json();
    return data;
  }
);

const sellersProductSlice = createSlice({
  name: 'seller',
  initialState: {
    sellersProduct: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(viewAllSellersProduct.pending, (state) => {
        return {
          ...state,
          status: 'loading',
        };
      })
      .addCase(viewAllSellersProduct.fulfilled, (state, action) => {
        return {
          ...state,
          status: 'succeeded',
          sellersProduct: action.payload,
        };
      })
      .addCase(viewAllSellersProduct.rejected, (state, action) => {
        return {
          ...state,
          status: 'failed',
          error: action.error.message,
        };
      })
      .addCase(viewSingleSellersProduct.pending, (state) => {
        return {
          ...state,
          status: 'loading',
        };
      })
      .addCase(viewSingleSellersProduct.fulfilled, (state, action) => {
        return {
          ...state,
          status: 'succeeded',
          sellersProduct: action.payload,
        };
      })
      .addCase(viewSingleSellersProduct.rejected, (state, action) => {
        return {
          ...state,
          status: 'failed',
          error: action.error.message,
        };
      });
  },
});

export default sellersProductSlice.reducer;
