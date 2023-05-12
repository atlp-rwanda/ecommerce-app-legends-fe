import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import logo from '../assets/logo.svg';
import SearchBar from './SearchBar';
import LocalizationSwicher from './LocalizationSwicher';
import TopSearchProducts from './TopSearchProducts';
import FrontCategoryDrawer from './FrontCategoryDrawer';
import UserAvatar from './UserAvatar';
import { viewCart } from '../redux/reducers/CartSlice';
import { viewWishList } from '../redux/reducers/WishListSlice';

const Navbar = () => {
  const [isCategoryOpen, setCategoryOpen] = useState(false);
  const [isMenuOpen, setisMenuOpen] = useState(false);
  const hasFocus = useSelector((state) => state.searchFocused.isSearchOpen);
  const user = useSelector((state) => state.currentUser.currentUser);
  const { items } = useSelector((state) => state.cart);
  const wishlistItems = useSelector((state) => state.wishlist.items);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(viewWishList());
    dispatch(viewCart());
  }, [dispatch]);

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
              to="/wishlist"
              className="text-md px-1 mx-2 text-center text-neutral-600 hover:text-neutral-900 md:mx-0"
            >
              <div className="flex">
                <Icon
                  className="text-center h-10 flex items-center p-0  w-6  md:w-4"
                  icon="mdi:cards-heart"
                />

                {wishlistItems && wishlistItems?.data && (
                  <p className="bg-orange-500 rounded-full h-6 w-6  md:h-5  md:w-4 md:text-sm md:pt-0 text-white">
                    {wishlistItems?.data?.length > 9
                      ? '9+'
                      : wishlistItems?.data?.length}
                  </p>
                )}
              </div>
            </NavLink>
            <NavLink
              to="/cart"
              className="text-md px-1 mx-2 text-center text-neutral-600 hover:text-neutral-900 md:mx-0"
            >
              <div className="flex">
                <Icon
                  className="text-center h-10 flex items-center p-0 w-6 md:w-4"
                  icon="ic:baseline-shopping-cart"
                />
                {items?.data && items?.data?.cart && (
                  <p className="bg-orange-500 rounded-full h-6 w-6  md:h-5  md:w-4 md:text-sm md:pt-0 text-white">
                    {items.data.cart.length > 9 ? '9+' : items.data.cart.length}
                  </p>
                )}
              </div>
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
