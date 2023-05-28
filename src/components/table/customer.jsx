import React from 'react';
import '../../index.css';

const Customer = ({
  className,
  fistName,
  email,
  gender,
  numbering,
  phone,
  onUserClick,
  id,
}) => {
  return (
    <tr className={className} onClick={() => onUserClick(id)}>
      <td className="leading-wide font-medium text-sm py-4 text-gray-700 pl-6  md:text-xs">
        {numbering}
      </td>
      <td className="leading-wide font-light text-sm py-4 text-gray-600 md:text-xs">
        {fistName}
      </td>

      <td className="leading-wide font-light text-sm py-4 text-gray-600 md:text-xs">
        {email}
      </td>
      <td className="leading-wide font-light text-sm py-4 text-gray-600 md:text-xs">
        {phone}
      </td>
      <td className="leading-wide font-light text-sm py-4 text-gray-600 md:text-xs">
        {gender}
      </td>
    </tr>
  );
};
export default Customer;
