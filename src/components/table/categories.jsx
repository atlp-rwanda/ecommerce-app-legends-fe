import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import TableColumn from './tableColumn';
import { fetchShoppableProducts } from '../../redux/reducers/products/AvailbleProducts';
import { diselect } from '../../redux/reducers/products/DrowCategories';
import { setsearchParam } from '../../redux/reducers/products/DrowSearchkey';

const ShowCategories = ({ categories, handleOnClick, isActive }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const handleClick = () => {
    dispatch(fetchShoppableProducts());
    dispatch(diselect(null));
    dispatch(setsearchParam(null));
  };
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
            <tr className="border-b-2 border-gray-400" onClick={handleClick}>
              <th className="px-4 py-2 font-normal flex justify-between gap-20 text-gray-500 whitespace-nowrap bg-white hover:bg-gray-200 hover:text-gray-700 hover:cursor-pointer shadow-md dark:bg-white active:bg-gray-400">
                <span>All</span>
              </th>
            </tr>
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
