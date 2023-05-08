import { configureStore } from '@reduxjs/toolkit';
import buttonReducer from './reducers/buttons';
import CurrentUserReducer from './reducers/AuthUser';
import cartReducer from './reducers/CartSlice';
import { productApi } from './reducers/productApi';

const store = configureStore({
  reducer: {
    ...buttonReducer,
    currentUser: CurrentUserReducer,
    cart: cartReducer,
    [productApi.reducerPath]: productApi.reducer,
  },

  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(productApi.middleware);
  },
});

export default store;
