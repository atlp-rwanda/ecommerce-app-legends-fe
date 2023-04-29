import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { test, describe, expect } from 'vitest';
import store from '../src/redux/store';
import NavBar from '../src/components/dashboards/admin/bars/NavBar';
import SideBar from '../src/components/dashboards/admin/bars/SideBar';

describe('NavBar', () => {
  test('renders the logo correctly', () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <NavBar />
        </Provider>
      </BrowserRouter>
    );
    const elements = screen.queryAllByText(/search/i);
    expect(elements).toHaveLength(1);
    expect(elements[0]).toBeInTheDocument();
  });
});

describe('SideBar', () => {
  test('renders the logo correctly', () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <SideBar />
        </Provider>
      </BrowserRouter>
    );
    const elements = screen.queryAllByText(/Dashboard/i);
    expect(elements).toHaveLength(1);
    expect(elements[0]).toBeInTheDocument();
  });
});
