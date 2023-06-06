/* eslint-disable no-param-reassign */
// productsSlice.jsx

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { client } from '../../API/client';

// get all products
export const fetchSellerProducts = createAsyncThunk(
  'sellerProducts/fetchSellerProducts',
  async (arg, { rejectWithValue }) => {
    try {
      //   const user = useSelector((state) => state.currentUser);
      const { data } = await client.get('/api/v1/seller/products', { arg });
      return data;
    } catch (error) {
      rejectWithValue(error.response.data);
    }
  }
);

// search products
export const searchSellerProducts = createAsyncThunk(
  'sellerProducts/searchSellerProducts',

  async (arg, { rejectWithValue }) => {
    try {
      const { data } = await client.get('/api/v1/seller/products', { arg });
      return data;
    } catch (error) {
      rejectWithValue(error.response.data);
    }
  }
);

// update product
export const deleteSellerProducts = createAsyncThunk(
  'sellerProducts/deleteSellerProducts',

  async (producId, { rejectWithValue }) => {
    try {
      const { data } = await client.delete(
        `/api/v1/products/delete/${producId}`
      );
      return data;
    } catch (error) {
      rejectWithValue(error.response.data);
    }
  }
);

// update product
export const updateSellerProducts = createAsyncThunk(
  'sellerProducts/updateSellerProducts',

  async (product, { rejectWithValue }) => {
    try {
      const { data } = await client.put(
        `/api/v1/products/update/${product.id}`,
        product.body,
        {
          headers: {
            'Content-type': 'multipart/form-data',
          },
        }
      );
      return data;
    } catch (error) {
      rejectWithValue(error.response.data);
    }
  }
);

// update product variants
export const updateProductAttribute = createAsyncThunk(
  'sellerProducts/updateProductAttribute',

  async (productAttribute, { rejectWithValue }) => {
    try {
      const { data } = await client.put(
        `/api/v1/product/variation/update/${productAttribute.id}`,
        productAttribute.body,
        {
          headers: {
            'Content-type': 'multipart/form-data',
          },
        }
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const sellersProductsSlice = createSlice({
  name: 'sellerProducts',
  initialState: {
    sellerProducts: {
      products: [],
      status: 'idle',
      error: null,
      updateProductStatus: '',
      updateProductAttributeStatus: '',
      fetchProductStatus: '',
      deleteStatus: '',
    },
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Load products
      .addCase(fetchSellerProducts.pending, (state) => {
        state.sellerProducts = {
          ...state.sellerProducts,
          status: 'loading',
          updateProductStatus: '',
          updateProductAttributeStatus: '',
          deleteStatus: '',
          fetchProductStatus: '',
        };
      })
      .addCase(fetchSellerProducts.fulfilled, (state, { payload }) => {
        state.sellerProducts = {
          ...state.sellerProducts,
          products: payload,
          status: 'succeeded',
          fetchProductStatus: payload.status,
        };
      })
      .addCase(fetchSellerProducts.rejected, (state, { payload, error }) => {
        state.sellerProducts = {
          products: payload,
          status: 'failed',
          error: error.message,
        };
      })
      // Delete product
      .addCase(deleteSellerProducts.pending, (state) => {
        state.sellerProducts.status = 'loading';
      })
      .addCase(deleteSellerProducts.fulfilled, (state, { payload }) => {
        state.sellerProducts = {
          status: 'succeeded',
          message: payload.message,
          deleteStatus: payload.message,
        };
      })
      .addCase(deleteSellerProducts.rejected, (state, { error }) => {
        state.sellerProducts = {
          ...state.sellerProducts,
          status: 'failed',
          error: error.message,
        };
      })
      // update product
      .addCase(updateSellerProducts.pending, (state) => {
        state.sellerProducts = {
          ...state.sellerProducts,
          status: 'loading',
        };
      })
      .addCase(updateSellerProducts.fulfilled, (state, { payload }) => {
        state.sellerProducts = {
          ...state.sellerProducts,
          status: 'succeeded',
          updateProductStatus: payload.message,
        };
        toast.success(payload.message, {
          theme: 'colored',
        });
      })
      .addCase(updateSellerProducts.rejected, (state, { error }) => {
        state.sellerProducts = {
          ...state.sellerProducts,
          status: 'failed',
          error: error.message,
        };
        toast.error(error.message, { theme: 'colored' });
      })
      // update product variations
      .addCase(updateProductAttribute.pending, (state) => {
        state.sellerProducts.status = 'loading';
      })
      .addCase(updateProductAttribute.fulfilled, (state, { payload }) => {
        state.sellerProducts = {
          ...state.sellerProducts,
          updateProductAttributeStatus: payload.message,
          message: payload.message,
        };
        toast.success(payload.message, {
          theme: 'colored',
        });
      })
      .addCase(updateProductAttribute.rejected, (state, { error }) => {
        state.sellerProducts = {
          ...state.sellerProducts,
          status: 'failed',
          error: error.message,
        };
        toast.error(error.message, { theme: 'colored' });
      });
  },
});

export default sellersProductsSlice.reducer;
