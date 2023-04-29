import React from 'react';
import { useTranslation } from 'react-i18next';

function Notifications() {
  const { t } = useTranslation();
  return (
    <div className="pt-16 bg-green-900 h-screen md:w-full">
      <div className="w-full h-fit mt-4">
        <center className="text-4xl py-80">{t('notifications')}</center>
      </div>
    </div>
  );
}

export default Notifications;
