import React, { useState } from 'react';
import { BiMessage } from 'react-icons/bi';
import { IoMdNotificationsOutline } from 'react-icons/io';
import { FaUserCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router';
import { useMediaQuery } from 'react-responsive';
import { useTranslation } from 'react-i18next';
import BurgerButton from './BurgerButton';
import SideBar from './SideBar';
import ECOMLOG from '../../../../assets/ECOMLOG.png';
import LocalesButton from '../../../buttons/LocalesButton';

function NavBar() {
  const { t } = useTranslation();
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
            <img src={ECOMLOG} alt="logo" className="w-28 h-16" />
          </div>
        )}
        {isSmallScreen && (
          <div className="logo w-full h-1/12 pr-2 mb-4 text-3xl text-black">
            <img src={ECOMLOG} alt="logo" className="w-20 h-12" />
          </div>
        )}
        {!isMediumScreen && (
          <div className="mr-28">
            <form className="search">
              <div className="relative search-div flex w-80">
                <input
                  type="text"
                  placeholder={t('search_text')}
                  className="search-bar bg-gray-200 px-3 py-2 mr-2 w-full rounded-l-md"
                />
                <button
                  type="button"
                  className="search-btn px-3 py-2 rounded-r-md bg-orange-500 text-salite-500 font-semibold"
                >
                  {' '}
                  {t('search')}
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="flex items-center mr-4 sm:mr-2 space-x-12 sm:space-x-4 ">
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
          <div className="flex top-0 space-x-0">
            <div className="cursor-pointer mr-0 mt-0 text-3xl md:text-sm mb-2">
              <LocalesButton />
            </div>
          </div>
          <div className="flex top-0">
            <div className="cursor-pointer mr-8 md:mr-0 mt-0 text-3xl md:text-2xl mb-2">
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
