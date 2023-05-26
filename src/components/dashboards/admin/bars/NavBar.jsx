import React, { useState, useEffect } from 'react';
import { BiMessage } from 'react-icons/bi';
import { IoMdNotificationsOutline } from 'react-icons/io';
import { FaUserCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router';
import { useMediaQuery } from 'react-responsive';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { io } from 'socket.io-client';
import BurgerButton from './BurgerButton';
import SideBar from './SideBar';
import ECOMLOG from '../../../../assets/ECOMLOG.png';
import LocalizationSwicher from '../../../LocalizationSwicher';
import { setActiveButton } from '../../../../redux/types/sideBardButtons';
import NotificatonContainer from '../../../NotificatonContainer';
import {
  fetchNotifications,
  selectNotificationCounter,
  selectNotifications,
} from '../../../../redux/reducers/seller/NotificationSlice';

const socket = io(
  'https://ecommerce-app-legends-bn-production.up.railway.app/'
);
const NavBar = () => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const dispatch = useDispatch();
  const activeButton = useSelector((state) => state.activeButton);

  const isMediumScreen = useMediaQuery({ maxWidth: 768 });
  const isSmallScreen = useMediaQuery({ maxWidth: 767 });

  const notifications = useSelector(selectNotifications);
  const notificationCounter = useSelector(selectNotificationCounter);
  const currentUser = useSelector((state) => state.currentUser);
  // (currentUser);
  useEffect(() => {
    socket.on('notification', (data) => {
      dispatch(fetchNotifications(currentUser.user.id));
    });
  }, []);
  const showMessages = useSelector((state) => state.notifications);
  const navigation = useNavigate();
  // const handleNotifications = () => navigation('/dashboard/notifications');
  const handleMessages = () => navigation('/dashboard/messages');
  const handleHome = () => {
    navigation('/');
    dispatch(setActiveButton('home'));
  };
  const hanleClickNotifications = () => {
    setShowNotification(!showNotification);
  };
  return (
    <>
      <div className="fixed top-0 left-0 w-full h-16 bg-white shadow-sm shadow-gray-900  flex items-center justify-between pl-0 md:justify-end pr-4 z-50">
        {!isSmallScreen && (
          <div className="relative logo w-full ml-2 h-1/12 pl-2 text-3xl left-0 float-left">
            <button type="button" onClick={handleHome}>
              {' '}
              <img src={ECOMLOG} alt="logo" className="w-28 h-16" />
            </button>
          </div>
        )}
        {isSmallScreen && (
          <div className="logo w-full h-1/12 pr-2 mb-4 text-3xl text-black">
            <button type="button" onClick={handleHome}>
              <img src={ECOMLOG} alt="logo" className="w-20 h-12" />
            </button>
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
            <button type="button" onClick={hanleClickNotifications}>
              <IoMdNotificationsOutline className="mr-2 text-3xl sm:text-2xl " />
            </button>
            <span className="absolute top-0 right-0 transform translate-x-2 -translate-y-2 inline-block w-6 h-6 rounded-full bg-red-500 text-white text-center leading-6">
              {notificationCounter || 0}
            </span>
          </div>
          {showNotification && (
            <NotificatonContainer notifications={notifications} />
          )}
          <div className="flex top-0 space-x-0">
            <div className="cursor-pointer mr-0 mt-0  md:text-sm mb-2">
              <LocalizationSwicher />
            </div>
          </div>
        </div>
      </div>
      {isMediumScreen && <SideBar isOpen={isOpen} />}
    </>
  );
};

export default NavBar;
