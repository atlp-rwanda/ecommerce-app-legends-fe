import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { test, describe, expect } from 'vitest';
import store from '../src/store';
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
    const elements = screen.queryAllByText(/PRODUCT/i);
    expect(elements).toHaveLength(2);
    expect(elements[0]).toBeInTheDocument();
  });
});
