import React from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { select } from '../redux/reducers/products/DrowCategories';

const FrontCategoryDrawer = ({ categories, isCategoryOpen }) => {
  const dispatch = useDispatch();
  if (categories !== undefined) {
    return (
      <div
        className={`${'overflow-hidden  hover:overflow-y-auto absolute  shadow-xl px-[1%] min-w-[200px] backdrop-blur-md bg-[#ffffff87] top-[4em] transition-transform h-[100vh]  duration-500 ease-in-out pt-5'} ${
          isCategoryOpen ? 'left-auto' : '-translate-x-[600px]'
        }`}
      >
        <ul className="overflow-hidden mb-10  hover:overflow-y-auto">
          {categories.data.map(({ id, name }) => {
            return (
              // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/click-events-have-key-events
              <NavLink
                key={id}
                to="/shop"
                className="text-xl font-light font-sans"
                onClick={() => dispatch(select(id))}
              >
                <li
                  className="w-full hover:bg-[#ffb77c1c] py-3 hover:text-orange-500 hover:bg-darkGrey p-2"
                  // key={id}
                >
                  {name}
                </li>
              </NavLink>
            );
          })}
        </ul>
      </div>
    );
  }
};

export default FrontCategoryDrawer;
