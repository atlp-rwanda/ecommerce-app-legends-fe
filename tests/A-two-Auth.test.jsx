import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { test, describe, expect } from 'vitest';
import store from '../src/redux/store';
import TwoFaForm from '../src/views/auths/2FaForm';

describe('Render two factor view on screen', () => {
  test('should render welcome vendor', () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <TwoFaForm />
        </Provider>
      </BrowserRouter>
    );
    const elements = screen.queryAllByText(/welcome back/i);
    expect(elements[0]).toBeInTheDocument();
  });
  test('should render verifyOTP', () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <TwoFaForm />
        </Provider>
      </BrowserRouter>
    );
    const elements = screen.queryAllByText(/verify/i);
    expect(elements[0]).toBeInTheDocument();
  });
});
