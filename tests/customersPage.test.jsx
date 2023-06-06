/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { render } from '@testing-library/react';
import Customer from '../src/components/table/customer';

describe('Customer', () => {
  const customer = {
    className: 'test-customer',
    fistName: 'John',
    email: 'johndoe@example.com',
    gender: 'Male',
    numbering: 1,
    phone: '1234567890',
    id: '1',
  };

  test('renders customer with correct data', () => {
    const { getByText } = render(<Customer {...customer} />);

    expect(getByText('John')).toBeInTheDocument();
    expect(getByText('johndoe@example.com')).toBeInTheDocument();
    expect(getByText('Male')).toBeInTheDocument();
    expect(getByText('1')).toBeInTheDocument();
    expect(getByText('1234567890')).toBeInTheDocument();
  });
});
