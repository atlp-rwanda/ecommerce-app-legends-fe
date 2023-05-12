import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import { Icon } from '@iconify/react';
import '../i18n/i18n';
import { useDispatch } from 'react-redux';
import { clearUser } from '../redux/reducers/AuthUser';

const UserAvatar = ({ user }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  function handleProfileClick() {
    setIsOpen(!isOpen);
  }

  return (
    <div className=" transition-all relative flex items-center justify-between flex-wrap p-2">
      <div className="block">
        <button
          type="button"
          className="flex items-center p-1 border rounded-full bg-gray-300 hover:text-white hover:border-white"
          onClick={handleProfileClick}
        >
          <Icon icon="mdi:user" />
        </button>
      </div>
      {isOpen && (
        <div className="absolute bg-[#e8e8e896] backdrop-blur-sm top-[60px] w-fit min-w-[150px] right-0 pb-3 block flex-grow lg:flex lg:items-center lg:w-fit ">
          <div className=" ml-3 font-semibold "> {user.user.firstname} </div>
          <div className="lg:flex-grow">
            <NavLink
              to="/profile"
              className="flex flex-col mt-1 lg:inline-block lg:mt-0 text-darkBlueColor hover:bg-darkBlueColor w-full px-3 py-2 hover:text-white"
            >
              <div> {t('profile')}</div>
            </NavLink>
          </div>
          <div>
            <button
              type="submit"
              className="block text-left mt-1 lg:inline-block lg:mt-0 text-darkBlueColor hover:bg-darkBlueColor w-full px-3 py-2 hover:text-white"
              onClick={() => {
                dispatch(clearUser());
                window.location.reload();
              }}
            >
              {t('logout')}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserAvatar;
