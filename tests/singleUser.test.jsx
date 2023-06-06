import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import SingleUserView from '../src/components/table/singleUserView';
import store from '../src/redux/store';

describe('SingleUserView', () => {
  test('renders user info correctly', () => {
    const user = {
      lastname: 'Doe',
      firstname: 'John',
      phone: '123456789',
      email: 'john@example.com',
      role: { name: 'User' },
      status: 'active',
    };

    const { getByText } = render(
      <Provider store={store}>
        <SingleUserView
          token="your-token"
          id="user-id"
          user={user}
          closeIcon={<span>X</span>}
          removeUserBox={() => {}}
        />
      </Provider>
    );

    expect(getByText('LastName:')).toBeInTheDocument();
    expect(getByText('Doe')).toBeInTheDocument();
    expect(getByText('FirstName:')).toBeInTheDocument();
    expect(getByText('John')).toBeInTheDocument();
    expect(getByText('phoneLabel:')).toBeInTheDocument();
    expect(getByText('123456789')).toBeInTheDocument();
    expect(getByText('emailLabel:')).toBeInTheDocument();
    expect(getByText('john@example.com')).toBeInTheDocument();
    expect(getByText('role:')).toBeInTheDocument();
    expect(getByText('User')).toBeInTheDocument();
    expect(getByText('status:')).toBeInTheDocument();
    expect(getByText('active')).toBeInTheDocument();
  });
});
