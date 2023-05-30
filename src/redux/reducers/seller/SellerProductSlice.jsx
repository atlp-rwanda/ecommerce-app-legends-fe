/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { client } from '../../API/client';

export const fetchSellerProducts = createAsyncThunk(
  'sellerProducts/fetchSellerProducts',
  async (arg, { rejectWithValue }) => {
    try {
      const { data } = await client.get('/api/v1/seller/products', { arg });
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const searchSellerProducts = createAsyncThunk(
  'sellerProducts/searchSellerProducts',
  async (arg, { rejectWithValue }) => {
    try {
      const { data } = await client.get('/api/v1/seller/products', { arg });
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteSellerProducts = createAsyncThunk(
  'sellerProducts/deleteSellerProducts',
  async (productId, { rejectWithValue }) => {
    try {
      const { data } = await client.delete(
        `/api/v1/products/delete/${productId}`
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

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
      return rejectWithValue(error.response.data);
    }
  }
);

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

const setLoadingStatus = (state) => {
  state.status = 'loading';
};

const setSuccessStatus = (state, { payload, message }) => {
  state.status = 'succeeded';
  state.updateProductAttributeStatus = '';
  state.fetchProductStatus = '';
  state.deleteStatus = '';
  state.updateProductStatus = message;
  toast.success(message, { theme: 'colored' });
};

const setErrorStatus = (state, { error }) => {
  state.status = 'failed';
  state.error = error.message;
  toast.error(error.message, { theme: 'colored' });
};

const sellersProductsSlice = createSlice({
  name: 'sellerProducts',
  initialState: {
    products: [],
    status: 'idle',
    error: null,
    updateProductStatus: '',
    updateProductAttributeStatus: '',
    fetchProductStatus: '',
    deleteStatus: '',
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSellerProducts.pending, setLoadingStatus)
      .addCase(fetchSellerProducts.fulfilled, (state, { payload }) => {
        state.products = payload;
        state.status = 'succeeded';
        state.fetchProductStatus = payload.status;
      })
      .addCase(fetchSellerProducts.rejected, setErrorStatus)
      .addCase(deleteSellerProducts.pending, setLoadingStatus)
      // Delete product
      .addCase(deleteSellerProducts.pending, (state) => {
        state.sellerProducts.status = 'loading';
      })
      .addCase(deleteSellerProducts.fulfilled, setSuccessStatus)
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
          updateProductStatus: '',
          updateProductAttributeStatus: '',
          fetchProductStatus: '',
        };
      })
      .addCase(updateSellerProducts.fulfilled, (state, { payload }) => {
        state.sellerProducts = {
          ...state.sellerProducts,
          status: 'succeeded',
          updateProductAttributeStatus: '',
          fetchProductStatus: '',
          deleteStatus: '',
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
          status: 'succeeded',
          updateProductStatus: '',
          fetchProductStatus: '',
          deleteStatus: '',
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
