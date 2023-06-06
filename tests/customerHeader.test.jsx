import React from 'react';
import { render } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next';
import i18n from 'i18next';
import CustomerListHeader from '../src/components/table/customerListHeader';

const translations = {
  en: {
    No: 'No',
    Firstname: 'Firstname',
    emailaddress: 'Email Address',
    phone: 'Phone',
    gender: 'Gender',
  },
};

i18n.init({
  lng: 'en',
  resources: translations,
});

describe('CustomerListHeader', () => {
  test('renders customer list header with correct translations', () => {
    const { getByText } = render(
      <I18nextProvider i18n={i18n}>
        <CustomerListHeader />
      </I18nextProvider>
    );

    expect(getByText('No')).toBeInTheDocument();
    expect(getByText('Firstname')).toBeInTheDocument();
    expect(getByText('emailaddress')).toBeInTheDocument();
    expect(getByText('phone')).toBeInTheDocument();
    expect(getByText('gender')).toBeInTheDocument();
  });
});
