import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

const token = JSON.parse(localStorage.getItem('token'));
const URL =
  'https://ecommerce-app-legends-bn-production.up.railway.app/api/v1/';

export const addToCart = createAsyncThunk(
  'cart/addToCart',
  async (id, { rejectWithValue }) => {
    const response = await fetch(`${URL}shoppingCart/add`, {
      method: 'POST',
      body: JSON.stringify({ productId: id }),
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

export const viewCart = createAsyncThunk('cart/viewCart', async () => {
  const response = await fetch(`${URL}shoppingCart/view`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  return data;
});

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addToCart.pending, (state) => {
        return {
          ...state,
          status: 'loading',
        };
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        return {
          ...state,
          status: 'succeeded',
          items: action.payload,
        };
      })
      .addCase(addToCart.rejected, (state, action) => {
        return {
          ...state,
          status: 'failed',
          error: action.error.message,
        };
      })
      .addCase(viewCart.pending, (state) => {
        return {
          ...state,
          status: 'loading',
        };
      })
      .addCase(viewCart.fulfilled, (state, action) => {
        return {
          ...state,
          status: 'succeeded',
          items: action.payload,
        };
      })
      .addCase(viewCart.rejected, (state, action) => {
        return {
          ...state,
          status: 'failed',
          error: action.error.message,
        };
      });
  },
});

export default cartSlice.reducer;
