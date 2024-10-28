import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../header/Header';
import Navigation from '../nav/Navigation';

const MainLayout = () => {
  return (
    <>
      <Header />
      <div className="main-body content-manager">
        <Navigation />
        <Outlet />
      </div>
    </>
  );
};

export default MainLayout;
