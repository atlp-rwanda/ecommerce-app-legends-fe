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
  const user = useSelector((state) => state.currentUser);
  const { items } = useSelector((state) => state.cart);
  const wishlistItems = useSelector((state) => state.wishlist.items);
  const { categories } = useSelector((state) => state.categories);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(viewCart());
  }, []);
  useEffect(() => {
    dispatch(viewWishList());
  }, []);

  const { t } = useTranslation();
  const pages = [
    {
      name: 'home',
      link: '/',
    },
    {
      name: 'shop',
      link: '/shop',
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
    <div className=" bg-white  items-center flex justify-between h-[4em] fixed w-full  z-40  shadow-lg top-0">
      <NavLink to="/">
        <img src={logo} alt="" className="h-[3em]" />
      </NavLink>
      <NavLink
        role="button"
        className="text-center md:flex items-center  md:mx-2 mx-16 hidden "
        onClick={() => setisMenuOpen(!isMenuOpen)}
      >
        <Icon className="w-6 text-3xl" icon="heroicons:bars-3-solid" />
      </NavLink>
      <div className="flex flex-1 items-center">
        <NavLink
          role="button"
          className="text-center  md:mx-2 mx-[2%] "
          onClick={() => setCategoryOpen(!isCategoryOpen)}
        >
          {t('categories')}
        </NavLink>

        <div className=" relative justify-between items-center flex  flex-1 mr-1">
          <div
            className={`menu relative md:absolute md:bg-white md:min-w-[140px] md:-left-[50%]  duration-500 ease-in-out ${
              isMenuOpen
                ? 'md:visible left-0 w-[100vw]  backdrop-blur-sm   transition-transform md:translate-y-[110px]'
                : 'md:invisible  transition-transform md:translate-y-[200px]'
            }`}
          >
            {pages.map((page) => (
              <NavLink
                key={page.name}
                to={page.link}
                className="text-md px-[2vw] text-center hover:md:border-[1px] md:py-2 md:hover:bg-darkGrey py-3  md:block text-neutral-800 hover:text-blue-900 border-blue-400 hover:sm:bg-[#3f4aec2e] "
              >
                {t(`${page.name}`)}
              </NavLink>
            ))}
          </div>

          <div className="right-menu-icons flex-1 flex justify-end items-center">
            <div className="search">
              <SearchBar />
            </div>
            <LocalizationSwicher />
            <NavLink
              to="/wishlist"
              className="text-md px-1 mx-2 text-center text-neutral-600 hover:text-neutral-900 md:mx-1"
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
              className="text-md mx-[1vw] text-center text-neutral-600 hover:text-neutral-900 md:mx-0"
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

            {user && user.user != null ? (
              <UserAvatar user={user} />
            ) : (
              <NavLink
                to="/login"
                className="border-lightYellow hover:bg-lightYellow hover:text-white hover:border-none transition-all text-lightYellow border-2 rounded-full px-8 ml-2 md:ml-1 py-1 pb-2  md:px-2 md:py-0 md:text-sm"
              >
                {t('login')}
              </NavLink>
            )}
          </div>
        </div>
      </div>
      <TopSearchProducts
        className={`absolute transition-all ${
          hasFocus ? 'flex' : 'hidden'
        } min-h-[15vh] justify-center shadow-xl  bg-[#f8f8f8] p-3 z-30 top-16 left-0   w-[100%] `}
      />
      <FrontCategoryDrawer
        categories={categories.payload}
        isCategoryOpen={isCategoryOpen}
      />
    </div>
  );
};

export default Navbar;
