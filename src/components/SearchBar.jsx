import React, { useEffect, useState } from 'react';
import { Icon } from '@iconify/react';
import { useDispatch, useSelector } from 'react-redux';
import { toogleSearchForm } from '../redux/reducers/searchFormToogle';

const SearchBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  // const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const dispatch = useDispatch();
  const hasFocus = useSelector((state) => state.searchFocused.isSearchOpen);
  const handleTyping = (value) => {
    console.log(value);
  };

  // useEffect(() => {
  // });
  return (
    <div className="relative  h-full mr-4 p-2 z-50">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  inset-y-0 h-5 pl-2 ml-2 flex items-center focus:outline-none "
      >
        <Icon icon="material-symbols:search" className="" />
      </button>
      <input
        type="search"
        onKeyUp={(e) => handleTyping(e.target.value)}
        onFocus={(e) => dispatch(toogleSearchForm(true))}
        onBlur={(e) => dispatch(toogleSearchForm(false))}
        className={`${
          isOpen ? ' h-9 mr-2 pl-2 pr-2  bg-neutral-100' : 'w-0 h-0'
        } absolute  right-0  top-1/2 transform  -translate-y-1/2 md:translate-y-[40px] md:translate-x-1/2 rounded-full focus:outline-none transition-all duration-500 ease-in-out`}
        placeholder="Search"
      />
    </div>
  );
};
export default SearchBar;
