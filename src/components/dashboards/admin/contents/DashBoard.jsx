import React from 'react';
import { useTranslation } from 'react-i18next';

function DashBoard() {
  const { t } = useTranslation();
  return (
    <div className="bg-blue-400 pt-16 h-screen md:w-full">
      <div className="w-full h-fit mt-4">
        <center className="text-4xl py-80">{t('dashboard')}</center>
      </div>
    </div>
  );
}

export default DashBoard;
