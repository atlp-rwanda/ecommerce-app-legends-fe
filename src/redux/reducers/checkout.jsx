import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

const URL = `https://ecommerce-app-legends-bn-production.up.railway.app`;

const token = JSON.parse(localStorage.getItem('token'));

export const Checkout = createAsyncThunk(
  'checkout/all',
  async (check, { rejectWithValue }) => {
    const response = await fetch(`${URL}/api/v1/checkout`, {
      method: 'POST',
      body: JSON.stringify({
        location: check.location,
      }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    if (response.status !== 200) {
      toast.error('chechout failed', {
        theme: 'colored',
      });
      return rejectWithValue(data.message);
    }
    const respo = await fetch(`${URL}/api/v1/checkout/payment`, {
      method: 'POST',
      body: JSON.stringify({
        cardNumber: check.cardNumber,
        exp_month: check.exp_month,
        exp_year: check.exp_year,
        cvcNumber: check.cvcNumber,
        currency: 'rwf',
      }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    const data2 = await respo.json();
    if (respo.status !== 200) {
      toast.error(data2.message, {
        theme: 'colored',
      });
      await fetch(`${URL}/api/v1/cancelCheckout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      return rejectWithValue(data2.message);
    }
    toast.success(data2.message, {
      theme: 'colored',
    });
    return data2;
  }
);
export const ApplyCoupon = createAsyncThunk(
  'checkout/coupon',
  async (coup, { rejectWithValue }) => {
    const response = await fetch(`${URL}/api/v1/coupons/apply/coupon`, {
      method: 'POST',
      body: JSON.stringify({
        couponCode: coup,
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
const CheckoutSlice = createSlice({
  name: 'checkout',
  initialState: {
    status: 'idle',
    statusCoupon: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(Checkout.pending, (state) => {
        return {
          ...state,
          status: 'loading',
        };
      })
      .addCase(Checkout.fulfilled, (state) => {
        return {
          ...state,
          status: 'succeeded',
        };
      })
      .addCase(Checkout.rejected, (state, action) => {
        return {
          ...state,
          status: 'failed',
          error: action.error.message,
        };
      })
      .addCase(ApplyCoupon.pending, (state) => {
        return {
          ...state,
          statusCoupon: 'loading',
        };
      })
      .addCase(ApplyCoupon.fulfilled, (state) => {
        return {
          ...state,
          statusCoupon: 'succeeded',
        };
      })
      .addCase(ApplyCoupon.rejected, (state, action) => {
        return {
          ...state,
          statusCoupon: 'failed',
          error: action.error.message,
        };
      });
  },
});
export default CheckoutSlice.reducer;
