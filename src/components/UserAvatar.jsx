import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import { Icon } from '@iconify/react';
import '../i18n/i18n';

const UserAvatar = ({ user }) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  function handleProfileClick() {
    setIsOpen(!isOpen);
  }

  return (
    <div className=" relative flex items-center justify-between flex-wrap p-2">
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
        <div className="absolute bg-darkGrey top-[60px] w-fit min-w-[100px] right-0 pb-3 block flex-grow lg:flex lg:items-center lg:w-fit">
          <div className="lg:flex-grow">
            <NavLink
              to="/profile"
              className="flex flex-col mt-1 rounded lg:inline-block lg:mt-0 text-darkBlueColor hover:bg-darkBlueColor w-full px-3 py-1 hover:text-white"
            >
              <div className=" border "> {user.firstname} </div>
              <div> {t('profile')}</div>
            </NavLink>
          </div>
          <div>
            <NavLink
              href="logout"
              className="block mt-1 lg:inline-block lg:mt-0 text-darkBlueColor hover:bg-darkBlueColor w-full px-3 py-1 hover:text-white"
            >
              {t('logout')}
            </NavLink>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserAvatar;
