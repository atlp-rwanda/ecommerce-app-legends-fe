import { configureStore } from '@reduxjs/toolkit';
import buttonReducer from './reducers/buttons';
import CurrentUserReducer from './reducers/AuthUser';
import cartReducer from './reducers/CartSlice';
import { productApi } from './reducers/productApi';
import languageSlice from './reducers/languageSlice';
import productsReducer from './reducers/fronUser/productsReducer';
import toogleSearchFormSlice from './reducers/searchFormToogle';

const store = configureStore({
  reducer: {
    ...buttonReducer,
    currentUser: CurrentUserReducer,
    cart: cartReducer,
    language: languageSlice,
    searchFocused: toogleSearchFormSlice,
    landingProducts: productsReducer,
    [productApi.reducerPath]: productApi.reducer,
  },

  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(productApi.middleware);
  },
});

export default store;
