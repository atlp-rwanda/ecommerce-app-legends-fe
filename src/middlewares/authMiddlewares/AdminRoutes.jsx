import React from 'react';
import { Navigate, Outlet } from 'react-router';
import { useSelector } from 'react-redux';
// eslint-disable-next-line react/function-component-definition
const AdminRoutes = () => {
  const currentUser = useSelector((state) => state.currentUser);
  const { role } = currentUser;
  return role && role === 'admin' ? <Outlet /> : <Navigate to="/login" />;
};
export default AdminRoutes;
