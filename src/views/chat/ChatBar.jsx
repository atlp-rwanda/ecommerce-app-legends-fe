import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { clearChatMessages } from '../../redux/reducers/chat/chatSlice';

const ChatBar = ({ users, isOpen }) => {
  const { t } = useTranslation();
  const [activeUsers, setActiveUsers] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    setActiveUsers(users);
  }, [users]);
  const handleClearChat = () => {
    dispatch(clearChatMessages());
  };
  return (
    <div
      className={`chat__sidebar h-full bg-slate-900 flex-20 text-white p-5 md:p-1 border-r border-white fixed w-1/6 ${
        isOpen
          ? 'md:block w-6/12 md:mt-10 md:p-1 md:px-2 md:bg-slate-900 md:backdrop-blur-md'
          : 'md:hidden'
      }`}
    >
      <div className="">
        <h4 className="chat__header mt-30 md:mt-2 mb-20">
          {t('active_users')}
        </h4>
        <div className="chat__users ">
          {activeUsers?.map((user) => (
            <div key={user.name} className="user__container flex">
              <div className="user__circle mt-1" />
              <p>{user.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChatBar;
