import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import SideBar from './SideBar';
import store from '../../../../redux/store';

export default {
  title: 'SideBar',
  component: SideBar,
};

export function Default() {
  return (
    <Router>
      <Provider store={store}>
        <SideBar />
      </Provider>
    </Router>
  );
}
