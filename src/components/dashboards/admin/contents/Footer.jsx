import React from 'react';
import { useTranslation } from 'react-i18next';

function Footer() {
  const { t } = useTranslation();
  const today = new Date();
  return (
    <footer className="-z-50 relative block footer bg-slate-900 text-white bottom-0 w-full h-12 py-2">
      <div className="flex flex-row justify-center items-center basis-full">
        <div className="flex justify-center items-center basis-full">
          <p>
            {t('copylights')} &copy; {today.getFullYear()} ATLP Legends
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
