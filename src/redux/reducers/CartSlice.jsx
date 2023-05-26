import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

const token = JSON.parse(localStorage.getItem('token'));
const userRole = JSON.parse(localStorage.getItem('role'));
console.log(userRole);
const URL =
  'https://ecommerce-app-legends-bn-production.up.railway.app/api/v1/';

export const addToCart = createAsyncThunk(
  'cart/addToCart',
  async (id, { rejectWithValue }) => {
    console.log(id);
    const response = await fetch(`${URL}shoppingCart/add`, {
      method: 'POST',
      body: JSON.stringify({ productId: id }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    if (userRole !== 'buyer') {
      toast.error('You are not allowed to add items to cart', {
        theme: 'colored',
      });
      return rejectWithValue(data.message);
    }
    if (response.status !== 201) {
      if (response.status === 401) {
        toast.error(`${data.message} Login first!`, {
          theme: 'colored',
        });
      } else {
        toast.error(data.message, {
          theme: 'colored',
        });
      }

      return rejectWithValue(data.message);
    }
    toast.success(data.message, {
      theme: 'colored',
    });
    return data;
  }
);

export const viewCart = createAsyncThunk('cart/viewCart', async () => {
  // const token = thunkAPI.getState().auth.token;
  if (!token) {
    throw new Error('A valid token is required to view the cart.');
  }

  const response = await fetch(`${URL}shoppingCart/view`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error('The provided token is invalid or has expired.');
    }
    throw new Error('Failed to fetch cart data.');
  }

  const data = await response.json();
  return data;
});

export const updateCart = createAsyncThunk(
  'cart/updateCart',
  async ({ id, quantity }) => {
    const response = await fetch(`${URL}shoppingCart/update`, {
      method: 'PATCH',
      body: JSON.stringify({
        id,
        quantity,
      }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    return data;
  }
);

export const removeFromCart = createAsyncThunk(
  'cart/removeFromCart',
  async (id, { rejectWithValue }) => {
    const response = await fetch(`${URL}shoppingCart/delete`, {
      method: 'DELETE',
      body: JSON.stringify({
        id,
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

export const clearCart = createAsyncThunk('cart/clearCart', async () => {
  const response = await fetch(`${URL}shoppingCart/clear`, {
    method: 'DELETE',
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
    cartStatus: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addToCart.pending, (state) => {
        return {
          ...state,
          status: 'loading',
          cartStatus: 'loading',
        };
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        return {
          ...state,
          status: 'succeeded',
          cartStatus: 'succeeded',
          items: action.payload,
        };
      })
      .addCase(addToCart.rejected, (state, action) => {
        return {
          ...state,
          status: 'failed',
          cartStatus: 'failed',
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
      })
      .addCase(updateCart.pending, (state) => {
        return {
          ...state,
          status: 'loading',
        };
      })
      .addCase(updateCart.fulfilled, (state, action) => {
        return {
          ...state,
          status: 'succeeded',
          items: action.payload,
        };
      })
      .addCase(updateCart.rejected, (state, action) => {
        return {
          ...state,
          status: 'failed',
          error: action.error,
        };
      })
      .addCase(removeFromCart.pending, (state, action) => {
        return {
          ...state,
          status: 'loading',
          items: action.payload,
        };
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        const itemId = action.payload; // the id of the removed item

        const updatedItems =
          state.items && state.items.filter((item) => item.id !== itemId);
        return {
          ...state,
          status: 'succeeded',
          items: updatedItems,
        };
      })

      .addCase(removeFromCart.rejected, (state, action) => {
        return {
          ...state,
          status: 'failed',
          error: action.error,
        };
      });
  },
});

export default cartSlice.reducer;
