import React from 'react';
import { Navigate, Outlet } from 'react-router';
import { useSelector } from 'react-redux';
// eslint-disable-next-line react/function-component-definition
const ValidatedBuyer = () => {
  const currentUser = useSelector((state) => state.currentUser);
  const { role } = currentUser;
  return role && role === 'buyer' ? <Outlet /> : <Navigate to="/login" />;
};
export default ValidatedBuyer;
