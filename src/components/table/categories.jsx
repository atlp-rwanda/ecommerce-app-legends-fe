import React from 'react';
import { useTranslation } from 'react-i18next';
import TableColumn from './tableColumn';

const ShowCategories = ({ categories, handleOnClick, isActive }) => {
  const { t } = useTranslation();
  return (
    <div className="w-[100%]">
      <div className="relative overflow-x-auto shadow-md rounded-sm overflow-scroll h-[40vh]">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-700 shadow-md ">
          <thead className="border-b-4 border-gray-400">
            <tr>
              <th
                scope="col"
                className=" py-3 bg-white text-gray-700 font-medium px-4"
              >
                {t('shopby')}
              </th>
            </tr>
          </thead>
          <tbody>
            {categories &&
              categories.map((category) => (
                <TableColumn
                  categoryName={category.name}
                  key={category.id}
                  id={category.id}
                  productsCounting={category.Products.length}
                  handleOnClick={handleOnClick}
                  isActive={isActive}
                />
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default ShowCategories;
