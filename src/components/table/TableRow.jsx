import React from 'react';
import '../../index.css';

const TableRow = ({
  className,
  fistName,
  lastName,
  email,
  dateofbirth,
  gender,
  status,
  rolename,
  numbering,
  onUserClick,
  id,
  roles,
  handleRoleChange,
}) => {
  const handleSelectClick = (e) => {
    e.stopPropagation();
  };
  return (
    <tr className={className} onClick={() => onUserClick(id)}>
      <td className="leading-wide font-medium text-sm py-4 text-gray-700 pl-6  md:text-xs">
        {numbering}
      </td>
      <td className="leading-wide font-light text-sm py-4 text-gray-600 md:text-xs">
        {fistName}
      </td>
      <td className="leading-wide font-light text-sm py-4 text-gray-600 md:text-xs">
        {lastName}
      </td>
      <td className="leading-wide font-light text-sm py-4 text-gray-600 md:text-xs">
        {email}
      </td>
      <td className="leading-wide font-light text-sm py-4 text-gray-600 flex md:text-xs">
        <select
          className="bg-transparent text-gray-900 text-sm rounded-sm focus:border-transparent block w-[60%] md:text-xs"
          onClick={handleSelectClick}
          onChange={(e) => handleRoleChange(e, id)}
        >
          <option value={rolename}>{rolename}</option>
          {roles.map((role) => (
            <option key={role.id} value={role.id}>
              {role.name}
            </option>
          ))}
        </select>
      </td>
      <td className="leading-wide font-light text-sm py-4 text-gray-600 md:text-xs">
        {dateofbirth}
      </td>
      <td className="leading-wide font-light text-sm py-4 text-gray-600 md:text-xs">
        {gender}
      </td>
      <td className="leading-wide font-light text-sm py-4 text-gray-600 md:text-xs">
        {status}
      </td>
    </tr>
  );
};
export default TableRow;
