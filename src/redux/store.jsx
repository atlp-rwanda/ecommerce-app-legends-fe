import { configureStore } from '@reduxjs/toolkit';
import buttonReducer from './reducers/buttons';
import CurrentUserReducer from './reducers/AuthUser';
import cartReducer from './reducers/CartSlice';
import sellersProductsSlice from './reducers/seller/SellerProductSlice';
import { productApi } from './reducers/productApi';
import languageSlice from './reducers/languageSlice';
import categoryReducer, { getCategories } from './reducers/fronUser/Categories';
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
    sellerProducts: sellersProductsSlice,
    [productApi.reducerPath]: productApi.reducer,
    users: usersSlice,
    roles: RoleSlice,
    selectedUsers: usersSlice,
    categories: categoryReducer,
  },

  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(productApi.middleware);
  },
});
store.dispatch(getCategories());
export default store;
