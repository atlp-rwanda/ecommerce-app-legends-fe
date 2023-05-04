import React from 'react';
import { useTranslation } from 'react-i18next';

function Products() {
  const { t } = useTranslation();
  return (
    <>
      <div className="pt-16 bg-yellow-400 h-fit md:w-full">
        <div className="w-full h-fit mt-4">
          <center className="text-4xl py-56">{t('products')}</center>
          <center className="text-4xl py-56">{t('products')}</center>
        </div>
      </div>
      <div className="footer w-full" />
    </>
  );
}

export default Products;
