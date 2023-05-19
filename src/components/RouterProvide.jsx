import React from 'react';
import { Provider } from 'react-redux';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import App from '../views/App';
import Login from '../views/auths/Login';
import store from '../redux/store';
import SignUpBuyer from '../views/signUpBuyer';
import DashBoardIndex from './dashboards/admin/contents/DashBoardIndex';
import ResetPassword from '../passwordreset/ResetPassword';
import NewPassword from '../passwordreset/newPassword';
import TwoFaForm from '../views/auths/2FaForm';
import VendorRoutes from '../middlewares/authMiddlewares/VendorRoutes';
import SingleProduct from '../views/Single Product/singleproduct';
import CartPage from './cart/CartPage';
import UserProfile from '../views/userProfile/UserProfile';
import WishListPage from './wishlist/WishListPage';
import ValidatedBuyer from '../middlewares/authMiddlewares/ValidatedBuyer';
import ShopPage from '../views/shoppingPage/shop';
import ContactPage from '../views/about/ContactPage';
import AboutPage from '../views/about/AboutPage';
import ChatPage from '../views/ChatPage';

// dotenv.config();
const RouterProv = () => {
  return (
    <React.StrictMode>
      <Provider store={store}>
        <ToastContainer />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/chat" element={<ChatPage />} />
            <Route path="/resetPassword" element={<ResetPassword />} />
            <Route path="/reset" element={<NewPassword />} />
            <Route path="/shop" element={<ShopPage />} />
            <Route path="/contact_us" element={<ContactPage />} />
            <Route path="/about" element={<AboutPage />} />

            <Route path="/product/:id" element={<SingleProduct />} />

            <Route element={<VendorRoutes />}>
              <Route path="/*" element={<DashBoardIndex />} />
            </Route>
            <Route element={<ValidatedBuyer />}>
              <Route path="/cart" element={<CartPage />} />
              <Route path="/wishlist" element={<WishListPage />} />
            </Route>
            <Route path="/Login" element={<Login />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/verify-otp" element={<TwoFaForm />} />
            <Route path="/sign-up-buyer" element={<SignUpBuyer />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </React.StrictMode>
  );
};
export default RouterProv;
// eslint-disable-next-line prettier/prettier
