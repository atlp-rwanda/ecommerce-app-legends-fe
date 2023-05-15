import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { test, describe, expect } from 'vitest';
import store from '../src/redux/store';
import CartPage from '../src/components/cart/CartPage';

describe('SignUpBuyer', () => {
  it('renders SignUpBuyer component', () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <CartPage />
        </Provider>
      </BrowserRouter>
    );
    it('renders a form with required input fields', () => {
      render(
        <BrowserRouter>
          <Provider store={store}>
            <CartPage />
          </Provider>
        </BrowserRouter>
      );

      expect(screen.getByLabelText('Remove')).toBeInTheDocument();
      expect(screen.getByLabelText('MY CART')).toBeInTheDocument();
    });
    it('should update the quantity of an item in the cart', () => {
      const wrapper = shallow(<CartPage />);
      const instance = wrapper.instance();
      const mockEvent = { target: { value: 5 } };
      instance.handleQuantityChange(0, mockEvent);

      expect(wrapper.state('quantities')[0]).toEqual(5);
    });
  });
});
