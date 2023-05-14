import { configureStore } from '@reduxjs/toolkit';
import buttonReducer from './reducers/buttons';
import CurrentUserReducer from './reducers/AuthUser';
import cartReducer from './reducers/CartSlice';
import { productApi } from './reducers/productApi';
import languageSlice from './reducers/languageSlice';
import productsReducer from './reducers/fronUser/productsReducer';
import toogleSearchFormSlice from './reducers/searchFormToogle';
import wishListSlice from './reducers/WishListSlice';
import usersSlice from './reducers/appUsersManager/manageUsersReducer';
import RoleSlice from './reducers/appUsersManager/getUsersRole';

const store = configureStore({
  reducer: {
    ...buttonReducer,
    currentUser: CurrentUserReducer,
    cart: cartReducer,
    language: languageSlice,
    searchFocused: toogleSearchFormSlice,
    landingProducts: productsReducer,
    wishlist: wishListSlice,
    [productApi.reducerPath]: productApi.reducer,
    users: usersSlice,
    roles: RoleSlice,
    selectedUsers: usersSlice,
  },

  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(productApi.middleware);
  },
});

export default store;
