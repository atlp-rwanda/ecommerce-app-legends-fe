import React from 'react';
import '../../index.css';
import { useTranslation } from 'react-i18next';

const CustomerListHeader = ({ className }) => {
  const { t } = useTranslation();
  return (
    <tr className={className}>
      <th className="leading-wide font-normal text-sm py-4 text-gray-700 pr-10  uppercase md:text-xs md:pl-3 md:overflow-scroll">
        No
      </th>
      <th className="leading-wide font-normal text-sm py-4 text-gray-700   text-left uppercase md:text-xs">
        {t('Firstname')}
      </th>
      <th className="leading-wide font-normal text-sm py-4 text-gray-700  text-left uppercase md:text-xs">
        {t('emailaddress')}
      </th>
      <th className="leading-wide font-normal text-sm py-4 text-gray-700   text-left uppercase md:text-xs">
        {t('phone')}
      </th>
      <th className="leading-wide font-normal text-sm py-4 text-gray-700  text-left  uppercase md:text-xs">
        {t('gender')}
      </th>
    </tr>
  );
};
export default CustomerListHeader;
