import React from 'react';
import '../../index.css';

const TableHeader = ({
  className,
  fistName,
  lastName,
  email,
  dateofbirth,
  gender,
  status,
  rolename,
}) => {
  return (
    <tr className={className}>
      <th className="leading-wide font-normal text-sm py-4 text-gray-700 pr-10  uppercase md:text-xs md:pl-3 md:overflow-scroll">
        No
      </th>
      <th className="leading-wide font-normal text-sm py-4 text-gray-700   text-left uppercase md:text-xs">
        {fistName}
      </th>
      <th className="leading-wide font-normal text-sm py-4 text-gray-700   text-left uppercase md:text-xs">
        {lastName}
      </th>
      <th className="leading-wide font-normal text-sm py-4 text-gray-700  text-left uppercase md:text-xs">
        {email}
      </th>
      <th className="leading-wide font-normal text-sm py-4 text-gray-700  text-left  uppercase md:text-xs md:-ml-4">
        {rolename}
      </th>
      <th className="leading-wide font-normal text-sm py-4 text-gray-700  text-left  uppercase md:text-xs">
        {dateofbirth}
      </th>
      <th className="leading-wide font-normal text-sm py-4 text-gray-700  text-left  uppercase md:text-xs">
        {gender}
      </th>
      <th className="leading-wide font-normal text-sm py-4 text-gray-700  text-left uppercase md:text-xs">
        {status}
      </th>
    </tr>
  );
};
export default TableHeader;
