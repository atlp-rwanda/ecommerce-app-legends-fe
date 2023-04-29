import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import NavBar from './NavBar';

export default {
  title: 'NavBar',
  component: NavBar,
};

export function Default() {
  return (
    <Router>
      <NavBar />
    </Router>
  );
}
