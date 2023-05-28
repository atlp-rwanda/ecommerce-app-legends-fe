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
import ShoppableProductSlice from './reducers/products/AvailbleProducts';
import VendorSlice from './reducers/seller/listOfVendors';
import selectCatSlice from './reducers/products/DrowCategories';
import RatingReducers from './reducers/rateProduct';
import sellersProductReducer from './reducers/seller/viewAllSellersProduct';
import selectSearchKeySlice from './reducers/products/DrowSearchkey';
import adminOrderSlice from './reducers/admin/AdminOrders';
import checkout from './reducers/checkout';
import NotificationSlice from './reducers/seller/NotificationSlice';
import socketSlice from './reducers/chat/socketSlice';
import chatSlice from './reducers/chat/chatSlice';
import passwdUpdate from './reducers/updatePassword';
import ClientSlice from './reducers/vendor/mycustomerSlice';

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
    rating: RatingReducers,
    [productApi.reducerPath]: productApi.reducer,
    users: usersSlice,
    roles: RoleSlice,
    selectedUsers: usersSlice,
    categories: categoryReducer,
    seller: sellersProductReducer,
    ShoppableProducts: ShoppableProductSlice,
    Vendors: VendorSlice,
    selector: selectCatSlice,
    searchKey: selectSearchKeySlice,
    adminOrders: adminOrderSlice,
    UpdatePassword: passwdUpdate,
    checkout,
    notifications: NotificationSlice,
    chat: chatSlice,
    socket: socketSlice,
    client: ClientSlice,
  },

  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(productApi.middleware);
  },
});
store.dispatch(getCategories());
export default store;
