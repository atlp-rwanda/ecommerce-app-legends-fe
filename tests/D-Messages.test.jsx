import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { test, describe, expect } from 'vitest';
import store from '../src/store';
import Messages from '../src/components/dashboards/admin/contents/Messages';

describe('Messages on dashboard', () => {
  test('renders product information', () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <Messages />
        </Provider>
      </BrowserRouter>
    );
    const elements = screen.queryAllByText(/MESSAGES/i);
    expect(elements).toHaveLength(1);
    expect(elements[0]).toBeInTheDocument();
  });
});
