import React from 'react';
import { NavLink } from 'react-router-dom';

const frontCategoryDrawer = ({ isCategoryOpen }) => {
  return (
    <div
      className={`${' absolute min-w-10/12 shadow-md px-[1%] min-w-[250px] bg-lightGrey top-[80px] transition-transform  duration-500 ease-in-out'} ${
        isCategoryOpen ? 'left-auto' : '-translate-x-[400px]'
      }`}
    >
      <ul>
        <li className="w-full hover:bg-darkGrey p-2">
          {' '}
          <NavLink to="/"> Category 1 </NavLink>{' '}
        </li>
        <li className="w-full hover:bg-darkGrey p-2">
          {' '}
          <NavLink to="/"> Category 1 </NavLink>{' '}
        </li>
        <li className="w-full hover:bg-darkGrey p-2">
          {' '}
          <NavLink to="/"> Category 1 </NavLink>{' '}
        </li>
        <li className="w-full hover:bg-darkGrey p-2">
          {' '}
          <NavLink to="/"> Category 1 </NavLink>{' '}
        </li>
        <li className="w-full hover:bg-darkGrey p-2">
          {' '}
          <NavLink to="/"> Category 1 </NavLink>{' '}
        </li>
        <li className="w-full hover:bg-darkGrey p-2">
          {' '}
          <NavLink to="/"> Category 1 </NavLink>{' '}
        </li>
        <li className="w-full hover:bg-darkGrey p-2">
          {' '}
          <NavLink to="/"> Category 1 </NavLink>{' '}
        </li>
        <li className="w-full hover:bg-darkGrey p-2">
          {' '}
          <NavLink to="/"> Category 1 </NavLink>{' '}
        </li>
        <li className="w-full hover:bg-darkGrey p-2">
          {' '}
          <NavLink to="/"> Category 1 </NavLink>{' '}
        </li>
      </ul>
    </div>
  );
};

export default frontCategoryDrawer;
