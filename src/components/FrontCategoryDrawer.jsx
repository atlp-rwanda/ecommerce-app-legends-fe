import React from 'react';
import { NavLink } from 'react-router-dom';

const frontCategoryDrawer = ({ categories, isCategoryOpen }) => {
  if (categories !== undefined) {
    return (
      <div
        className={`${' absolute  shadow-xl px-[1%] min-w-[200px] backdrop-blur-md bg-[#ffffff87] top-[4em] transition-transform h-[100vh]  duration-500 ease-in-out pt-5'} ${
          isCategoryOpen ? 'left-auto' : '-translate-x-[600px]'
        }`}
      >
        <ul>
          {categories.data.map(({ id, name }) => {
            return (
              <li
                className="w-full hover:bg-[#ffb77c1c] py-3 hover:text-orange-500 hover:bg-darkGrey p-2"
                key={id}
              >
                <NavLink to="/" className="text-xl font-light font-sans">
                  {name}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
};

export default frontCategoryDrawer;
