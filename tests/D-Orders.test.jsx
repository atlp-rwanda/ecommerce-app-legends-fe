import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { test, describe, expect } from 'vitest';
import store from '../src/store';
import Orders from '../src/components/dashboards/admin/contents/Orders';

describe('Orders on dashboard', () => {
  test('renders orders information', () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <Orders />
        </Provider>
      </BrowserRouter>
    );
    const elements = screen.queryAllByText(/ORDERS/i);
    expect(elements).toHaveLength(1);
    expect(elements[0]).toBeInTheDocument();
  });
});
