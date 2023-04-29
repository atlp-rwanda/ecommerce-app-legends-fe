import React from 'react';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import {
  AiFillDashboard,
  AiFillShopping,
  AiOutlineBorderBottom,
  AiOutlineLogout,
} from 'react-icons/ai';
import { HiUsers } from 'react-icons/hi';
import { FaUserCircle, FaHome } from 'react-icons/fa';
import { setActiveButton, logout } from '../../../../types/sideBardButtons';

function SideBar({ isOpen }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const activeButton = useSelector((state) => state.activeButton);

  const handleProduct = () => {
    navigate('/dashboard/products');
    dispatch(setActiveButton('product'));
  };
  const handleCustomer = () => {
    navigate('/dashboard/customers');
    dispatch(setActiveButton('customer'));
  };
  const handleOrder = () => {
    navigate('/dashboard/orders');
    dispatch(setActiveButton('order'));
  };
  const handleUser = () => {
    navigate('/dashboard/users');
    dispatch(setActiveButton('user'));
  };
  const handleDash = () => {
    navigate('/dashboard');
    dispatch(setActiveButton('dashboard'));
  };
  const handleHome = () => {
    navigate('/');
    dispatch(setActiveButton('home'));
  };
  const handleSettings = () => {
    navigate('/dashboard/settings');
    dispatch(setActiveButton('setting'));
  };
  const handleLogout = () => {
    navigate('/login');
    dispatch(logout());
  };

  const isButtonActive = (buttonName) => {
    return activeButton === buttonName
      ? 'border-r-4 border-orange-500 text-white'
      : 'bg-slate-900 shadow-sm shadow-slate-500/50 text-gray-600';
  };

  return (
    <div
      className={`fixed max-w-fit h-screen bg-slate-900 shadow-sm shadow-gray-500/50 overflow-y-auto px-2 md:right-0 mt-16 md:backdrop-blur-sm md:bg-slate/30 md:pb-24 ${
        isOpen ? 'md:block' : 'md:hidden'
      }`}
    >
      <div className="container flex flex-col basis-full h-screen pt-5 space-y-48 ">
        <div className="top">
          <div
            className={`flex space-x-4 logo basis-full  h-12 mt-1 p-3 md:mt-0 ${isButtonActive(
              'dashboard'
            )}`}
          >
            <div className="icon">
              {' '}
              <button type="button">
                <AiFillDashboard className="text-3xl" />
              </button>
            </div>
            <div className="link text-xl">
              <button type="button" onClick={handleDash}>
                Dashboard
              </button>
            </div>
          </div>
          <div
            className={`flex space-x-4 logo basis-full  h-12 mt-0.5 p-3 ${isButtonActive(
              'product'
            )}`}
          >
            <div className="icon">
              {' '}
              <button type="button">
                <AiFillShopping className="text-3xl" />
              </button>
            </div>
            <div className="link text-xl">
              <button type="button" onClick={handleProduct}>
                Product
              </button>
            </div>
          </div>
          <div
            className={`flex space-x-4 logo basis-full bg-slate-900 h-12 mt-0.5 p-3 ${isButtonActive(
              'customer'
            )}`}
          >
            <div className="icon">
              {' '}
              <button type="button">
                <HiUsers className="text-3xl" />
              </button>
            </div>
            <div className="link text-xl">
              <button type="button" onClick={handleCustomer}>
                Customers
              </button>
            </div>
          </div>
          <div
            className={`flex space-x-4 logo basis-full  h-12 mt-0.5 p-3 ${isButtonActive(
              'order'
            )}`}
          >
            <div className="icon">
              {' '}
              <button type="button">
                <AiOutlineBorderBottom className="text-3xl" />{' '}
              </button>
            </div>
            <div className="link text-xl">
              <button type="button" onClick={handleOrder}>
                Orders
              </button>
            </div>
          </div>
          <div
            className={`flex space-x-4 logo basis-full  h-12 mt-0.5 p-3 ${isButtonActive(
              'user'
            )}`}
          >
            <div className="icon">
              {' '}
              <button type="button">
                <HiUsers className="text-3xl" />{' '}
              </button>
            </div>
            <div className="link text-xl">
              <button type="button" onClick={handleUser}>
                Users
              </button>
            </div>
          </div>
          <div
            className={`flex space-x-4 logo basis-full h-12 mt-0.5 p-3 ${isButtonActive(
              'home'
            )}`}
          >
            <div className="icon">
              {' '}
              <button type="button">
                <FaHome className="text-3xl" />{' '}
              </button>
            </div>
            <div className="link text-xl">
              <button type="button" onClick={handleHome}>
                Home
              </button>
            </div>
          </div>
        </div>
        <div className="absolute bottom-28 w-full md:relative">
          <div
            className={`flex space-x-4 logo basis-full h-12 mt-0.5 p-3 ${isButtonActive(
              'setting'
            )}`}
          >
            <div className="icon">
              {' '}
              <button type="button">
                <FaUserCircle className="text-3xl" />{' '}
              </button>
            </div>
            <div className="link text-md">
              <button type="button" onClick={handleSettings}>
                Admin joe
              </button>
            </div>
          </div>
          <div
            className={`flex space-x-4 logo basis-full h-12 mt-0.5 p-3 ${isButtonActive(
              'logout'
            )}`}
          >
            <div className="icon">
              {' '}
              <button type="button">
                <AiOutlineLogout className="text-3xl" />{' '}
              </button>
            </div>
            <div className="link text-md">
              <button type="button" onClick={handleLogout}>
                Log out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SideBar;
