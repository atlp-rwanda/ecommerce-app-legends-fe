import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { test, describe, expect } from 'vitest';
import store from '../src/redux/store';
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
    // expect(elements[0]).toBeInTheDocument();
  });
});
