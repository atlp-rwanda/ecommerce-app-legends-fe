import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { test, describe, expect } from 'vitest';
import store from '../src/redux/store';
import Users from '../src/components/dashboards/admin/contents/Users';

describe('Users on dashboard', () => {
  test('renders users information', () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <Users />
        </Provider>
      </BrowserRouter>
    );
    const elements = screen.queryAllByText(/USERS/i);
    expect(elements).toHaveLength(1);
    expect(elements[0]).toBeInTheDocument();
  });
});
