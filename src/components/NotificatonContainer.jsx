import React, { useEffect, useState } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import moment from 'moment';
import { io } from 'socket.io-client';
import { useDispatch, useSelector } from 'react-redux';
// eslint-disable-next-line import/no-cycle
import { markAsRead } from '../redux/reducers/seller/NotificationSlice';

const NotificatonContainer = ({ notifications }) => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.currentUser);

  function getTimeAgo(createdAt) {
    return moment(createdAt).fromNow();
  }

  const handleMarkAsRead = () => {
    dispatch(markAsRead(currentUser.user.id));
  };

  return (
    <div className="w-[34vw] bg-gray-100 max-h-screen text-white shadow rounded p-4 md:w-[80vw] sm:block sm:w-full absolute top-8 right-2 z-20 mt-10">
      {notifications?.length > 0 && (
        <button
          type="button"
          className="w-fit text-xl bg-gray-600 py-1 px-2 text-white font-semibold rounded-md right-0"
          onClick={handleMarkAsRead}
        >
          Mark as read
        </button>
      )}
      {notifications?.length > 0 ? (
        notifications?.map((notification) => (
          <div
            key={notification?.id}
            className="w-full bg-gray-900 text-white shadow rounded p-2 my-3"
          >
            <div className="mb-2">
              <div className="font-bold text-sm">{notification?.subject}</div>
              {notification !== null ? (
                <div className="text-xs font-thin">
                  {getTimeAgo(notification?.createdAt)}
                </div>
              ) : (
                <div className="w-full bg-gray-900 text-white shadow rounded p-2 my-3">
                  <div className="mb-2">
                    <div className="font-bold text-sm">
                      No unread notifications
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="text-sm font-light">{notification?.message}</div>
          </div>
        ))
      ) : (
        <div className="w-full bg-gray-900 text-white shadow rounded p-2 my-3">
          <div className="mb-2">
            <div className="font-bold text-sm">No unread notifications</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificatonContainer;
