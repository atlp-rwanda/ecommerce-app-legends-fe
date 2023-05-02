import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../src/redux/store';
import SignUpBuyer from '../src/views/signUpBuyer';

describe('SignUpBuyer', () => {
  it('renders SignUpBuyer component', () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <SignUpBuyer />
        </Provider>
      </BrowserRouter>
    );
    it('renders a form with required input fields', () => {
      render(
        <BrowserRouter>
          <Provider store={store}>
            <SignUpBuyer />
          </Provider>
        </BrowserRouter>
      );

      expect(screen.getByLabelText('Email')).toBeInTheDocument();
      expect(screen.getByLabelText('Password')).toBeInTheDocument();
      expect(screen.getByLabelText('Name')).toBeInTheDocument();
      expect(screen.getByLabelText('Address')).toBeInTheDocument();
    });
    it('validates form fields correctly', () => {
      render(
        <BrowserRouter>
          <Provider store={store}>
            <SignUpBuyer />
          </Provider>
        </BrowserRouter>
      );

      const emailInput = screen.getByLabelText('Email');
      const passwordInput = screen.getByLabelText('Password');
      const nameInput = screen.getByLabelText('Name');
      const phone = screen.getByLabelText('Address');
      const submitButton = screen.getByRole('button', { name: 'Sign Up' });

      // Test form validation when required fields are empty
      expect(submitButton).toBeDisabled();

      // Test form validation when required fields are filled
      expect(emailInput).not.toHaveValue();
      expect(passwordInput).not.toHaveValue();
      expect(nameInput).not.toHaveValue();
      expect(phone).not.toHaveValue();

      userEvent.type(emailInput, 'example@example.com');
      userEvent.type(passwordInput, 'password');
      userEvent.type(nameInput, 'John Doe');
      userEvent.type(phone, '123467890987');

      expect(submitButton).toBeEnabled();
    });

    // add assertion code here
  });
});
