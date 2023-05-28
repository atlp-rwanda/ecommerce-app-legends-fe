import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import {
  selectUsers,
  fetchUsersStatus,
  updateUserById,
  fetchUsers,
  selectUpdateMsg,
} from '../../../../redux/reducers/appUsersManager/manageUsersReducer';
import {
  selectRoles,
  fetchRoles,
} from '../../../../redux/reducers/appUsersManager/getUsersRole';
import TableHeader from '../../../table/TableHeader';
import TableRow from '../../../table/TableRow';
import Loading from '../../../Loading';
import MyCustomers from '../../../../views/vendors/Mycustomers';

const Customers = () => {
  const users = useSelector(selectUsers);
  const fetchStatus = useSelector(fetchUsersStatus);
  const roles = useSelector(selectRoles);
  const message = useSelector(selectUpdateMsg);
  const [filteredUsers, setFilteredUsers] = useState('buyer');
  const [loader, setLoader] = useState(false);
  const currentUser = useSelector((state) => state.currentUser);
  const { role } = currentUser;
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.currentUser);
  const handleRoleChange = (e, id) => {
    const roleId = e.target.value;
    dispatch(updateUserById({ id, roleId }));
    if (message !== '') {
      toast.success(message, { theme: 'colored' });
      document.body.style.overflow = 'scroll';
    }
  };
  useEffect(() => {
    if (role === 'admin') {
      dispatch(fetchUsers()).unwrap();
      dispatch(fetchRoles());
    }
  }, [dispatch, token]);
  const getFilteredUsers = users?.filter((user) => {
    if (filteredUsers === 'buyer') {
      return user.role?.name === 'buyer';
    }
    return user;
  });
  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);
  return (
    <div>
      {role === 'vendor' ? (
        <MyCustomers />
      ) : (
        <div className="bg-gray-200 pt-20 ml-2 md:w-full md:overflow-scroll">
          <div className={fetchStatus !== 'loading' || loader ? 'hidden' : ''}>
            <Loading />
          </div>
          <table
            className={
              loader || fetchStatus === 'loading'
                ? 'hidden mx-auto pt-20 w-full  md:text-xs md:pl-3 md:overflow-scroll'
                : 'mx-auto pt-20 w-full  md:text-xs md:pl-3 md:overflow-scroll'
            }
          >
            <thead>
              <TableHeader
                className="bg-gray-100 shadow-md mt-20"
                fistName={t('Firstname')}
                lastName={t('Lastname')}
                email={t('emailaddress')}
                dateofbirth={t('dateofbirth')}
                gender={t('gender')}
                status={t('Acc_status')}
                rolename={t('role')}
              />
            </thead>
            <tbody>
              {getFilteredUsers &&
                getFilteredUsers
                  .sort((a, b) => a.firstname.localeCompare(b.firstname))
                  .map((user, index) => (
                    <TableRow
                      numbering={index + 1}
                      key={user.id}
                      id={user.id}
                      className=" mx-auto bg-white shadow-sm border-2 border-gray-100 "
                      fistName={user.firstname}
                      lastName={user.lastname}
                      email={user.email}
                      dateofbirth={user.dateofbirth}
                      gender={user.gender}
                      status={user.status}
                      rolename={user.role?.name}
                      handleRoleChange={handleRoleChange}
                      onUserClick={(id) => console.log(id)}
                      roles={roles}
                    />
                  ))}
            </tbody>
          </table>
          <span className="font-light text-sm flex justify-end mx-8">
            Showing
            <span className="font-medium"> {getFilteredUsers?.length} </span>
            users
          </span>
        </div>
      )}
    </div>
  );
};
export default Customers;
