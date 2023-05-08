import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { test, describe, expect } from 'vitest';
import store from '../src/redux/store';
import Login from '../src/views/auths/Login';

describe('NavBar', () => {
  test('renders the logo correctly', () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <Login />
        </Provider>
      </BrowserRouter>
    );
    const emailInput = screen.getByLabelText('Email');
    expect(emailInput).toBeInTheDocument();
    const passwordInput = screen.getByLabelText('Password');
    expect(passwordInput).toBeInTheDocument();
  });
});
