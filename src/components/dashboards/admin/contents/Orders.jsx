import React from 'react';
import { useTranslation } from 'react-i18next';

function Orders() {
  const { t } = useTranslation();
  return (
    <>
      <div className="pt-16 bg-yellow-400 h-screen md:w-full">
        <div className="w-full h-screen mt-4">
          <center className="text-4xl py-56">{t('orders')}</center>
        </div>
      </div>
      <div className="footer w-full" />
    </>
  );
}

export default Orders;
