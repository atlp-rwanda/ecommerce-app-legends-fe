import React from 'react';

const orderList = ({ fistName, gender, numbering, phone, amount }) => {
  return (
    <tr className=" mx-auto bg-white shadow-sm border-2 border-gray-100">
      <th className="leading-wide font-light text-sm py-4 text-gray-600 md:text-xs">
        {numbering}
      </th>
      <th className="leading-wide font-light text-sm py-4 text-gray-600 md:text-xs">
        {fistName}
      </th>
      <th className="leading-wide font-light text-sm py-4 text-gray-600 md:text-xs">
        {phone}
      </th>
      <th className="leading-wide font-light text-sm py-4 text-gray-600 md:text-xs">
        {amount}
      </th>
      <th className="leading-wide font-light text-sm py-4 text-gray-600 md:text-xs">
        {gender}
      </th>
    </tr>
  );
};
export default orderList;
