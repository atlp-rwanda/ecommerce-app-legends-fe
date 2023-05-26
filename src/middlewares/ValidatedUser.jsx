import React from 'react';
import { Navigate, Outlet } from 'react-router';
import { useSelector } from 'react-redux';
// eslint-disable-next-line react/function-component-definition
const Validateduser = () => {
  const currentUser = useSelector((state) => state.currentUser);
  const { role } = currentUser;
  return role ? <Outlet /> : <Navigate to="/login" />;
};

export default Validateduser;
