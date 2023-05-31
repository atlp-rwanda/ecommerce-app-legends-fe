import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import MyCustomers from '../src/views/vendors/Mycustomers';
import store from '../src/redux/store';

describe('MyCustomers', () => {
  test('displays empty state when no clients are available', () => {
    const clients = []; // Empty array

    const { queryByText, queryByTestId } = render(
      <Provider store={store}>
        <MyCustomers />
      </Provider>
    );

    // Check for the absence of loading state
    expect(queryByTestId('loading')).not.toBeInTheDocument();
    // Check that the table and user count are not rendered
    expect(queryByTestId('customer-table')).not.toBeInTheDocument();
    expect(queryByText('Showing 0 users')).not.toBeInTheDocument();
  });
});
