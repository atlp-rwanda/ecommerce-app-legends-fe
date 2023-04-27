import React from 'react';
import { Route, Routes } from 'react-router-dom';
import NavBar from '../bars/NavBar';
import SideBar from '../bars/SideBar';
import DashBoard from './DashBoard';
import Products from './Products';
import Customers from './Customers';
import Orders from './Orders';
import Footer from './Footer';
import Users from './Users';
import Messages from './Messages';
import Notifications from './Notifications';
import Settings from './Settings';

function DashBoardIndex() {
  return (
    <div>
      <NavBar />
      <SideBar />
      <div className="ml-44 md:ml-0">
        <Routes>
          <Route path="/dashboard" element={<DashBoard />} />
          <Route path="/dashboard/products" element={<Products />} />
          <Route path="/dashboard/customers" element={<Customers />} />
          <Route path="/dashboard/orders" element={<Orders />} />
          <Route path="/dashboard/users" element={<Users />} />
          <Route path="/dashboard/notifications" element={<Notifications />} />
          <Route path="/dashboard/messages" element={<Messages />} />
          <Route path="/dashboard/settings" element={<Settings />} />
        </Routes>
        <Footer />
      </div>
    </div>
  );
}

export default DashBoardIndex;
