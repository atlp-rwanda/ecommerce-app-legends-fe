import React from 'react';
import { useTranslation } from 'react-i18next';

const Customers = () => {
  const { t } = useTranslation();
  return (
    <div className="pt-16 h-fit md:w-full bg-gray-500">
      <div className="w-full h-fit mt-4 1xl:bg-green-500 md:bg-red-500 md:shrink-0">
        <center className="text-4xl py-56">{t('customers')}</center>
        <center className="text-4xl py-56">{t('customers')}</center>
        <center className="text-4xl py-56">{t('customers')}</center>
        <center className="text-4xl py-56">{t('customers')}</center>
        <center className="text-4xl py-56">{t('customers')}</center>
      </div>
    </div>
  );
};

export default Customers;
