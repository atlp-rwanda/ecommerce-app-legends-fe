import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { test, describe, expect, it, vitest } from 'vitest';
import store from '../src/redux/store';
import Products from '../src/components/dashboards/admin/contents/Products';

describe('Products on dashboard', () => {
  test('renders product information', () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <Products />
        </Provider>
      </BrowserRouter>
    );
    const elements = screen.queryAllByText(/P. Name/i);
  });
});
