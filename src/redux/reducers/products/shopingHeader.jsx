import React from 'react';
import { FaSearch } from 'react-icons/fa';
import { RiDashboardFill } from 'react-icons/ri';
import { useTranslation } from 'react-i18next';

const ShopingHeader = ({ onSearch, handleSort, fetchStatus, products }) => {
  const { t } = useTranslation();
  return (
    <div className={fetchStatus === 'loading' ? 'hidden' : ''}>
      <form>
        <div className="relative flex flex-row justify-around pt-6 shadow-md">
          <div>
            <input
              type="search"
              className="block w-full px-8 py-2 text-sm text-gray-900 border bg-gray-200 border-gray-300 rounded-full dark:placeholder-gray-500 md:text-xs md:p-1"
              placeholder="Search product..."
              required
              onChange={(e) => onSearch(e)}
            />
            <div
              className={
                products.length < 1
                  ? 'hidden'
                  : 'absolute top-9 left-[26vw] md:hidden'
              }
            >
              <FaSearch size={15} />
            </div>
          </div>
          <div className={products.length < 1 ? 'hidden' : 'flex flex-row'}>
            <RiDashboardFill size={30} color="gray" />
            <select
              className="w-full px-2  mb-6 mt-1 text-sm text-gray-900 bg-gray-400 border border-gray-300 rounded-xs dark:placeholder-gray-400 dark:text-white  md:font-thin"
              onChange={(e) => handleSort(e)}
            >
              <option>{t('sortBy')}</option>
              <option value="price">{t('price')}</option>
              <option value="quantity">{t('many')}</option>
            </select>
          </div>
        </div>
      </form>
    </div>
  );
};
export default ShopingHeader;
