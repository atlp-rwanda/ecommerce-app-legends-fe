import React from 'react';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import App from '../views/App';
import Login from '../views/Login';
import store from '../store';
import Products from './dashboards/admin/contents/Products';
import DashBoardIndex from './dashboards/admin/contents/DashBoardIndex';

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
