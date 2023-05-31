/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { render } from '@testing-library/react';
import TableRow from '../src/components/table/TableRow';

describe('TableRow', () => {
  const row = {
    className: 'test-row',
    fistName: 'John',
    lastName: 'Doe',
    email: 'johndoe@example.com',
    dateofbirth: '1990-01-01',
    gender: 'Male',
    status: 'Active',
    rolename: 'User',
    numbering: 1,
    id: '1',
    roles: [
      { id: '1', name: 'Admin' },
      { id: '2', name: 'Moderator' },
    ],
    handleRoleChange: () => {},
    onUserClick: () => {},
  };

  test('renders table row with correct data', () => {
    const { getByText } = render(<TableRow {...row} />);

    expect(getByText('John')).toBeInTheDocument();
    expect(getByText('Doe')).toBeInTheDocument();
    expect(getByText('johndoe@example.com')).toBeInTheDocument();
    expect(getByText('1990-01-01')).toBeInTheDocument();
    expect(getByText('Male')).toBeInTheDocument();
    expect(getByText('Active')).toBeInTheDocument();
  });
});
