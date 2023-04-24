import React from 'react';
import { NavLink } from 'react-router-dom';

function Navbar() {
  return (
    <div className="relative  w-full  bg-neutral-100 py-2  shadow-lg  ">
      <div className="flex w-2/5 flex-wrap justify-between  px-5">
        <NavLink
          to="/"
          className="text-xl text-neutral-600 hover:text-neutral-900"
        >
          Home
        </NavLink>
        <NavLink
          to="/login"
          className="text-xl text-neutral-600 hover:text-neutral-900 "
        >
          Login
        </NavLink>
      </div>
    </div>
  );
}

export default Navbar;
