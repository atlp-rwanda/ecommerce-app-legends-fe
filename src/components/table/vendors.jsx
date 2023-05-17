import React from 'react';
import { useTranslation } from 'react-i18next';
import TableColumn from './tableColumn';

const ShowVendors = ({ vendors, handleOnClick }) => {
  const { t } = useTranslation();
  return (
    <div className="w-[100%]">
      <div className="relative overflow-x-auto shadow-md rounded-sm overflow-scroll h-[40vh]">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-700">
          <thead className="border-b-4 border-gray-400">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 bg-white text-gray-700 font-medium"
              >
                {t('shobySeller')}
              </th>
            </tr>
          </thead>
          <tbody>
            {vendors &&
              vendors.map((vendor) => (
                <TableColumn
                  categoryName={vendor.vendorName}
                  // eslint-disable-next-line react/no-array-index-key
                  key={vendor.vendorId}
                  id={vendor.vendorId}
                  handleOnClick={handleOnClick}
                  productsCounting={vendor.vendorProducts.length}
                />
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default ShowVendors;
