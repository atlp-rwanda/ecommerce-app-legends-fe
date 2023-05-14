/* eslint-disable no-shadow */
import { t } from 'i18next';
import React from 'react';

const FilterUsers = ({ FilterUsers }) => {
  const handleFilterUsers = (e) => {
    FilterUsers(e.target.value);
  };
  return (
    <div className="flex gap-2 justify-end mx-6 my-2 md:w-4/4">
      <label
        htmlFor="roles"
        className="block mb-2 text-md mt-2 font-medium text-slate-900 dark:text-slate-700 md:text-xs"
      >
        {t('filterUser')}
      </label>
      <select
        onChange={handleFilterUsers}
        className="bg-slate-700 border border-slate-300 text-gray-900 text-sm rounded-lg focus:ring-slate-700 focus:border-slate-700 block w-[10%] md:w-[40%] p-2 dark:bg-slate-600 dark:border-slate-800 dark:placeholder-gray-400 dark:text-white dark:focus:ring-slate-700 dark:focus:border-slate-700 md:text-xs md:p-0"
      >
        <option value="All">{t('All')}</option>
        <option value="vendor">{t('Vendor')}</option>
        <option value="buyer">{t('Buyer')}</option>
        <option value="admin">{t('admin')}</option>
      </select>
    </div>
  );
};
export default FilterUsers;
