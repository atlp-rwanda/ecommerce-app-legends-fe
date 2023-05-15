/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { toast } from 'react-toastify';
import Button from '../formControlscomponents/Button/Button';
import { URL } from '../../views/auths/Login';
import {
  adminDisableUserStatus,
  adminEnableUserStatus,
  fetchUsers,
  selectedUpdatedStatus,
} from '../../redux/reducers/appUsersManager/manageUsersReducer';

const SingleUserView = ({ token, id, user, closeIcon, removeUserBox }) => {
  const dispatch = useDispatch();
  const status = useSelector(selectedUpdatedStatus);
  const [deleteButton, setdeleteButton] = useState({
    display: 'hidden',
    text: `delete user`,
  });
  const [activeButton, setActiveButton] = useState({
    display: 'hidden',
    text: `activate`,
  });

  const [disableButton, setDisableButton] = useState({
    display: 'hidden',
    text: `disable`,
  });
  const [selectedUSer, setSelectedUser] = useState(user);
  const handleDeleteUser = () => {
    setdeleteButton({
      display: 'inline-block',
      text: `Loading...`,
    });
    axios
      .delete(`${URL}/api/admin/users/${id}?`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        // eslint-disable-next-line no-unused-expressions
        response
          ? toast.success('deleting a user sucess!', { theme: 'colored' })
          : toast.error('deleting a user failed!', { theme: 'colored' });
        removeUserBox();
      });
    setdeleteButton({
      display: 'hidden',
      text: `delete user`,
    });
  };

  const hundleActiveUser = async () => {
    setActiveButton({
      display: 'inline-block',
      text: `Loading...`,
    });
    dispatch(adminEnableUserStatus(user.id));
    console.log(status);
    if (status === 'succeeded') {
      toast.success('user activated!', { theme: 'colored' });
    } else {
      toast.error('user activation failed!', { theme: 'colored' });
    }
    dispatch(fetchUsers()).unwrap();
    removeUserBox();
    setActiveButton({
      display: 'hidden',
      text: `activate`,
    });
  };

  const hundleDisableUser = async () => {
    setDisableButton({
      display: 'inline-block',
      text: `Loading...`,
    });
    dispatch(adminDisableUserStatus(user.id));
    if (status === 'succeeded') {
      toast.success('user activated!', { theme: 'colored' });
    } else {
      toast.error('user activation failed!', { theme: 'colored' });
    }
    dispatch(fetchUsers()).unwrap();
    removeUserBox();
    setDisableButton({
      display: 'hidden',
      text: `disable`,
    });
  };

  return (
    <div className="bg-gray-100 shadow-lg rounded-md border-2 border-slate-500 w-2/4 md:w-full">
      <div className=" w-auto shadow-md flex justify-between px-10 md:px-4">
        <h1 className=" text-left font-medium text-slate-6 uppercase py-2">
          User info
        </h1>
        <span
          className="my-2 px-2 shadow-sm rounded-xl hover:bg-red-400 hover:cursor-pointer md:px-0"
          onClick={removeUserBox}
        >
          {closeIcon}
        </span>
      </div>
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm px-22 text-left text-gray-500 dark:text-gray-400 md:text-xs">
          <tbody>
            <tr className="bg-white dark:bg-white">
              <th
                scope="row"
                className="px-6 py-2 text-gray-600 font-normal whitespace-nowrap dark:text-gray-900 w-2/4 text-center"
              >
                Last name
              </th>
              <td className="px-6 py-2 text-gray-600">
                {selectedUSer.lastname}
              </td>
            </tr>
            <tr className="bg-white dark:bg-white">
              <th
                scope="row"
                className="px-6 py-2 text-gray-600 font-normal whitespace-nowrap dark:text-gray-900 w-2/4 text-center"
              >
                First name:
              </th>
              <td className="px-6 py-2 text-gray-600">
                {selectedUSer.firstname}
              </td>
            </tr>
            <tr className="bg-white dark:bg-white">
              <th
                scope="row"
                className="px-6 py-2 text-gray-600 font-normal whitespace-nowrap dark:text-gray-900 w-2/4 text-center"
              >
                Phone
              </th>
              <td className="px-6 py-2 text-gray-600">{selectedUSer.phone}</td>
            </tr>
            <tr className="bg-white dark:bg-white">
              <th
                scope="row"
                className="px-6 py-2 text-gray-600 font-normal whitespace-nowrap dark:text-gray-900 w-2/4 text-center"
              >
                Email
              </th>
              <td className="px-6 py-2 text-gray-600">{selectedUSer.email}</td>
            </tr>
            <tr className="bg-white dark:bg-white">
              <th
                scope="row"
                className="px-6 py-2 text-gray-600 font-normal whitespace-nowrap dark:text-gray-900 w-2/4 text-center"
              >
                Role
              </th>
              <td className="px-6 py-2 text-gray-600">
                {selectedUSer.role.name}
              </td>
            </tr>
            <tr className="bg-white dark:bg-white">
              <th
                scope="row"
                className="px-6 py-2 text-gray-600 font-normal whitespace-nowrap dark:text-gray-900 w-2/4 text-center"
              >
                status
              </th>
              <td className="px-6 py-2 text-gray-600">{selectedUSer.status}</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td className="w-2/4 text-center py-4">
                <Button
                  className="text-xs bg-red-400 py-1 text-white font-sans rounded-sm font-medium  capitalize hover:opacity-70 md:text-xs w-2/4"
                  btnName={deleteButton.text}
                  display={deleteButton.display}
                  handleSend={handleDeleteUser}
                />
              </td>
              <td>
                {user.status !== 'active' ? (
                  <Button
                    className="text-xs bg-[#27ae60] py-1 text-white font-sans rounded-sm font-medium  capitalize hover:opacity-70 md:text-xs w-2/4"
                    btnName="activate"
                    display={activeButton.display}
                    handleSend={hundleActiveUser}
                  />
                ) : (
                  <Button
                    className="text-xs bg-slate-400 py-1 text-white font-sans rounded-sm font-medium  capitalize hover:opacity-70 md:text-xs w-2/4"
                    btnName="disable"
                    display={disableButton.display}
                    handleSend={hundleDisableUser}
                  />
                )}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};
export default SingleUserView;
