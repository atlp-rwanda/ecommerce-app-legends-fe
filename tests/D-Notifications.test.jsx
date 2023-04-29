import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { test, describe, expect } from 'vitest';
import store from '../src/redux/store';
import Notifications from '../src/components/dashboards/admin/contents/Notifications';

describe('Notifications on dashboard', () => {
  test('renders notifications information', () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <Notifications />
        </Provider>
      </BrowserRouter>
    );
    const elements = screen.queryAllByText(/NOTIFICATIONS/i);
    expect(elements).toHaveLength(1);
    expect(elements[0]).toBeInTheDocument();
  });
});
