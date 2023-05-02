import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { test, describe, expect } from 'vitest';
import store from '../src/redux/store';
import Customers from '../src/components/dashboards/admin/contents/Customers';

describe('Products on dashboard', () => {
  test('renders product information', () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <Customers />
        </Provider>
      </BrowserRouter>
    );
    const elements = screen.queryAllByText(/CUSTOMERS/i);
    expect(elements).toHaveLength(5);
    expect(elements[0]).toBeInTheDocument();
  });
});
