import React, { useState } from 'react';
import { BiMessage } from 'react-icons/bi';
import { IoMdNotificationsOutline } from 'react-icons/io';
import { FaUserCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router';
import { useMediaQuery } from 'react-responsive';
import BurgerButton from './BurgerButton';
import SideBar from './SideBar';

function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

  const isMediumScreen = useMediaQuery({ maxWidth: 768 });
  const isSmallScreen = useMediaQuery({ maxWidth: 767 });

  const navigation = useNavigate();
  const handleNotifications = () => navigation('/dashboard/notifications');
  const handleMessages = () => navigation('/dashboard/messages');
  return (
    <>
      <div className="fixed top-0 left-0 w-full h-16 bg-white shadow-sm shadow-gray-900  flex items-center justify-between pl-0 md:justify-end pr-4">
        {!isSmallScreen && (
          <div className="relative logo w-full ml-2 h-1/12 pl-2 text-3xl left-0 float-left">
            Legends
          </div>
        )}
        {isSmallScreen && (
          <div className="logo w-full h-1/12 pr-2 text-3xl text-black">L</div>
        )}
        {!isMediumScreen && (
          <div className="mr-28">
            <form className="search">
              <div className="relative search-div flex w-80">
                <input
                  type="text"
                  placeholder="I am here to search for..."
                  className="search-bar bg-gray-200 px-3 py-2 mr-2 w-full rounded-l-md"
                />
                <button
                  type="button"
                  className="search-btn px-3 py-2 rounded-r-md bg-orange-500 text-salite-500 font-semibold"
                >
                  {' '}
                  Search
                </button>
              </div>
            </form>
          </div>
        )}
        <div className="flex items-center mr-4 space-x-12 sm:space-x-8 ">
          <div className="relative">
            <button type="button" onClick={handleMessages}>
              {' '}
              <BiMessage className="mr-2 text-3xl sm:text-2xl" />
            </button>
            <span className="absolute top-0 right-0 transform translate-x-2 -translate-y-2 inline-block w-6 h-6 rounded-full bg-red-500 text-white text-center leading-6">
              2
            </span>
          </div>
          <div className="relative">
            <button type="button" onClick={handleNotifications}>
              <IoMdNotificationsOutline className="mr-2 text-3xl sm:text-2xl " />
            </button>
            <span className="absolute top-0 right-0 transform translate-x-2 -translate-y-2 inline-block w-6 h-6 rounded-full bg-red-500 text-white text-center leading-6">
              2
            </span>
          </div>
          <div className="flex top-0 space-x-8">
            <div className="cursor-pointer mr-12 mt-0 text-3xl md:text-2xl mb-2">
              <FaUserCircle />
            </div>
          </div>
          {isMediumScreen && (
            <div className="md:mr-12 md:text-3xl md:mb-2 md:right-0">
              {' '}
              <BurgerButton isOpen={isOpen} setIsOpen={setIsOpen} />
            </div>
          )}
        </div>
      </div>
      {isMediumScreen && <SideBar isOpen={isOpen} />}
    </>
  );
}

export default NavBar;
