import React from 'react';
import { Navigate, Outlet } from 'react-router';
import { useSelector } from 'react-redux';
// eslint-disable-next-line react/function-component-definition
const BuyerRoutes = () => {
  const currentUser = useSelector((state) => state.currentUser);
  const { token } = currentUser;
  return token ? <Outlet /> : <Navigate to="/login" />;
};
export default BuyerRoutes;
