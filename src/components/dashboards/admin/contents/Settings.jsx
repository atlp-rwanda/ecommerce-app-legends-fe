import React from 'react';
import { useTranslation } from 'react-i18next';

function Settings() {
  const { t } = useTranslation();
  return (
    <div className="pt-16 bg-blue-400 h-screen md:w-full">
      <div className=" w-full h-fit mt-4">
        <center className="text-4xl py-80">{t('settings')}</center>
      </div>
    </div>
  );
}

export default Settings;
