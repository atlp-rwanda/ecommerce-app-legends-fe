import React from 'react';
import { useTranslation } from 'react-i18next';

function Users() {
  const { t } = useTranslation();
  return (
    <div className="pt-16 bg-blue-400 h-screen md:w-full">
      <div className="w-full h-fit mt-4">
        <center className="text-4xl py-80">{t('users')}</center>
      </div>
    </div>
  );
}

export default Users;
