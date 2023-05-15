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
import DummyProductVariatonsPage from './cart/DummyProductVariatonsPage';
import CartPage from './cart/CartPage';
import UserProfile from '../views/userProfile/UserProfile';
import WishListPage from './wishlist/WishListPage';
import ValidatedBuyer from '../middlewares/authMiddlewares/ValidatedBuyer';

// dotenv.config();
const RouterProv = () => {
  return (
    <React.StrictMode>
      <Provider store={store}>
        <ToastContainer />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/resetPassword" element={<ResetPassword />} />
            <Route path="/reset" element={<NewPassword />} />

            <Route
              path="/product-variation"
              element={<DummyProductVariatonsPage />}
            />
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
