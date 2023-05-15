import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import CartPage from './CartPage';
import store from '../../redux/store';

export default {
  title: 'SideBar',
  component: CartPage,
};

export const Default = () => {
  return (
    <Router>
      <Provider store={store}>
        <CartPage />
      </Provider>
    </Router>
  );
};
