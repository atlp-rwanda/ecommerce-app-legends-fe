/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import Button from '../formControlscomponents/Button/Button';
import { URL } from '../../views/auths/Login';

const SingleUserView = ({ token, id, user, closeIcon, removeUserBox }) => {
  const [deleteButton, setdeleteButton] = useState({
    display: 'hidden',
    text: `delete user`,
  });
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
      });
    setdeleteButton({
      display: 'hidden',
      text: `delete user`,
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
                className="px-6 py-2 text-gray-600 font-normal text-gray-900 whitespace-nowrap dark:text-gray-900 w-2/4 text-center"
              >
                Last name
              </th>
              <td className="px-6 py-2 text-gray-600">{user.lastname}</td>
            </tr>
            <tr className="bg-white dark:bg-white">
              <th
                scope="row"
                className="px-6 py-2 text-gray-600 font-normal text-gray-900 whitespace-nowrap dark:text-gray-900 w-2/4 text-center"
              >
                First name:
              </th>
              <td className="px-6 py-2 text-gray-600">{user.firstname}</td>
            </tr>
            <tr className="bg-white dark:bg-white">
              <th
                scope="row"
                className="px-6 py-2 text-gray-600 font-normal text-gray-900 whitespace-nowrap dark:text-gray-900 w-2/4 text-center"
              >
                Phone
              </th>
              <td className="px-6 py-2 text-gray-600">{user.phone}</td>
            </tr>
            <tr className="bg-white dark:bg-white">
              <th
                scope="row"
                className="px-6 py-2 text-gray-600 font-normal text-gray-900 whitespace-nowrap dark:text-gray-900 w-2/4 text-center"
              >
                Email
              </th>
              <td className="px-6 py-2 text-gray-600">{user.email}</td>
            </tr>
            <tr className="bg-white dark:bg-white">
              <th
                scope="row"
                className="px-6 py-2 text-gray-600 font-normal text-gray-900 whitespace-nowrap dark:text-gray-900 w-2/4 text-center"
              >
                Role
              </th>
              <td className="px-6 py-2 text-gray-600">{user.role.name}</td>
            </tr>
            <tr className="bg-white dark:bg-white">
              <th
                scope="row"
                className="px-6 py-2 text-gray-600 font-normal text-gray-900 whitespace-nowrap dark:text-gray-900 w-2/4 text-center"
              >
                status
              </th>
              <td className="px-6 py-2 text-gray-600">{user.status}</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td className="w-2/4 text-center py-4">
                <Button
                  className="w-1/4 text-xs bg-red-400 py-1 text-white font-sans rounded-sm  uppercase hover:opacity-70 md:text-xs w-2/4"
                  btnName={deleteButton.text}
                  display={deleteButton.display}
                  handleSend={handleDeleteUser}
                />
              </td>
              <td>
                {user.status !== 'active' ? (
                  <Button
                    className="w-1/4 text-xs bg-green-400 py-1 text-white font-sans rounded-sm  uppercase hover:opacity-70 md:text-xs w-2/4"
                    btnName="activate"
                    display={deleteButton.display}
                    handleSend={handleDeleteUser}
                  />
                ) : (
                  <Button
                    className="w-1/4 text-xs bg-slate-400 py-1 text-white font-sans rounded-sm  uppercase hover:opacity-70 md:text-xs w-2/4"
                    btnName="Disactivate"
                    display={deleteButton.display}
                    handleSend={handleDeleteUser}
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
