import React from 'react';

const TableColumn = ({ categoryName, productsCounting, id, handleOnClick }) => {
  return (
    <tr
      className="border-b-2 border-gray-400"
      onClick={() => handleOnClick(id)}
    >
      <th
        scope="row"
        className="px-4 py-2 font-normal flex justify-between gap-20 text-gray-500 whitespace-nowrap bg-white hover:bg-gray-200 hover:text-gray-700 hover:cursor-pointer shadow-md dark:bg-white active:bg-gray-400"
      >
        <span>{categoryName}</span>
        <span>{productsCounting}</span>
      </th>
    </tr>
  );
};
export default TableColumn;
