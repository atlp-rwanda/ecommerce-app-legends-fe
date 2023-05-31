/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { render } from '@testing-library/react';
import OrderList from '../src/components/table/orderList';

describe('OrderList', () => {
  const order = {
    fistName: 'John',
    gender: 'Male',
    numbering: 1,
    phone: '1234567890',
    amount: '$100',
  };

  test('renders order list with correct data', () => {
    const { getByText } = render(<OrderList {...order} />);

    expect(getByText('John')).toBeInTheDocument();
    expect(getByText('Male')).toBeInTheDocument();
    expect(getByText('1')).toBeInTheDocument();
    expect(getByText('1234567890')).toBeInTheDocument();
    expect(getByText('$100')).toBeInTheDocument();
  });
});
