import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import logo from '../assets/logo.svg';
import SearchBar from './SearchBar';
import LocalizationSwicher from './LocalizationSwicher';
import TopSearchProducts from './TopSearchProducts';
import FrontCategoryDrawer from './FrontCategoryDrawer';
import UserAvatar from './UserAvatar';

const Navbar = () => {
  const [isCategoryOpen, setCategoryOpen] = useState(false);
  const [isMenuOpen, setisMenuOpen] = useState(false);
  const hasFocus = useSelector((state) => state.searchFocused.isSearchOpen);
  const user = useSelector((state) => state.currentUser.currentUser);

  const { t } = useTranslation();
  const pages = [
    {
      name: 'home',
      link: '/',
    },
    {
      name: 'shop',
      link: '/',
    },
    {
      name: 'about_us',
      link: '/',
    },
    {
      name: 'contact_us',
      link: '/login',
    },
  ];
  return (
    <div className="container sticky  flex items-center fi h-20 md:container md:mx-auto bg-white py-2 z-40  shadow-lg">
      <div className="relative w-14 md:w-6 md:block">
        <NavLink to="/">
          {' '}
          <img src={logo} alt="" className=" w-full" />
        </NavLink>
      </div>
      <div className="flex flex-1 items-center">
        <NavLink
          role="button"
          className="text-center  md:mx-2 mx-16 "
          onClick={() => setCategoryOpen(!isCategoryOpen)}
        >
          {t('categories')}
        </NavLink>

        <NavLink
          role="button"
          className="text-center md:flex items-center  md:mx-2 mx-16 hidden "
          onClick={() => setisMenuOpen(!isMenuOpen)}
        >
          <Icon className="w-4" icon="heroicons:bars-3-solid" />
        </NavLink>

        <div className="navbar relative justify-between items-center flex  flex-1">
          <div
            className={`menu relative md:absolute md:bg-darkGrey md:min-w-[140px] md:-left-[50%]  duration-500 ease-in-out ${
              isMenuOpen
                ? 'md:visible  transition-transform md:translate-y-[125px]'
                : 'md:invisible  transition-transform md:translate-y-[200px]'
            }`}
          >
            {pages.map((page) => (
              <NavLink
                key={page.name}
                to={page.path}
                className="text-md px-5 md:border-b-2 md:py-2 hover:bg-darkGrey py-3 md:border-lightGrey md:block text-neutral-600 hover:text-neutral-900"
              >
                {t(`${page.name}`)}
              </NavLink>
            ))}
          </div>

          <div className="right-menu-icons flex-1 flex justify-end items-center">
            <div className="searc">
              <SearchBar />
            </div>
            <LocalizationSwicher />
            <NavLink
              to="/cart"
              className="text-md px-1 mx-2 text-center text-neutral-600 hover:text-neutral-900 md:mx-0"
            >
              <Icon
                className="text-center h-10 flex items-center p-0  w-6  md:w-4"
                icon="mdi:cards-heart"
              />
            </NavLink>
            <NavLink
              to="/cart"
              className="text-md px-1 mx-2 text-center text-neutral-600 hover:text-neutral-900 md:mx-0"
            >
              <Icon
                className="text-center h-10 flex items-center p-0 w-6 md:w-4"
                icon="ic:baseline-shopping-cart"
              />
            </NavLink>

            {user ? (
              <UserAvatar user={user} />
            ) : (
              <NavLink
                to="/login"
                className="border-lightYellow border-2 rounded-full px-8 ml-6 md:ml-1 py-1 text-neutral-600 hover:text-neutral-900 md:px-2 md:py-0 md:text-sm"
              >
                {t('login')}
              </NavLink>
            )}
          </div>
        </div>
      </div>
      <TopSearchProducts
        className={`absolute ${
          hasFocus ? 'block' : 'hidden'
        } min-h-10 bg-darkGrey p-3 z-50 top-20 md:top-32 left-1/2 -translate-x-1/2  w-[60%] md:w-[60%] sm:w-[95%]`}
      />
      <FrontCategoryDrawer isCategoryOpen={isCategoryOpen} />
    </div>
  );
};

export default Navbar;
