import React from 'react';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import App from '../views/App';
import Login from '../views/auths/Login';
import store from '../redux/store';
import SignUpBuyer from '../views/signUpBuyer';
import Products from './dashboards/admin/contents/Products';
import DashBoardIndex from './dashboards/admin/contents/DashBoardIndex';
import TwoFaForm from '../views/auths/2FaForm';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/*',
    element: <DashBoardIndex />,
    children: [
      {
        path: '/*dashboard',
        element: <Products />,
      },
    ],
  },
  {
    path: '/Login',
    element: <Login />,
  },
  {
    path: '/verify-otp',
    element: <TwoFaForm />,
  },
  {
    path: '/sign-up-buyer',
    element: <SignUpBuyer />,
  },
]);

function RouterProv() {
  return (
    <React.StrictMode>
      <Provider store={store}>
        <ToastContainer />
        <RouterProvider router={router} />
      </Provider>
    </React.StrictMode>
  );
}
export default RouterProv;
