import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { test, describe, expect } from 'vitest';
import store from '../src/store';
import Settings from '../src/components/dashboards/admin/contents/Settings';

describe('Products on dasboard', () => {
  test('renders settings information', () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <Settings />
        </Provider>
      </BrowserRouter>
    );
    const elements = screen.queryAllByText(/SETTINGS/i);
    expect(elements).toHaveLength(1);
    expect(elements[0]).toBeInTheDocument();
  });
});
